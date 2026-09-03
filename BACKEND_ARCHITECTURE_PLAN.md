# AgriMart & AgriStock: Hybrid Backend Architecture Plan
### Enterprise Django + Async FastAPI + PostgreSQL + Redis
### Production-Grade Transaction Safety, Real-Time Auctions, AI/ML Readiness, and Defense-in-Depth Security

---

## 1. Executive Summary & Core Mission

AgriMart combines two backend workloads that should not be forced into one runtime style:

1. **Mission-critical transactional engine:** E-commerce, agricultural inputs, machinery rentals, payments, refunds, inventory locks, audit trails, and admin workflows need strict ACID guarantees and relational consistency.
2. **High-throughput real-time and AI pipeline:** Mandi bidding, live price tickers, WebSockets, crop-disease inference, and mandi forecasting need async I/O, low-latency fanout, and isolated compute budgets.

The backend uses a hybrid architecture:

* **Django 5 + DRF:** Canonical business writes, custom user auth, admin suite, orders, rentals, payments, settlements, refunds, and durable audit trails.
* **FastAPI (ASGI):** Real-time WebSockets, latency-sensitive read APIs, auction fanout, crop AI inference gateway, price forecast APIs, and streaming market data.
* **PostgreSQL 16:** Single source of truth with ACID constraints, row locking, JSONB, CITEXT, exclusion constraints, and `pgvector`.
* **Redis 7:** Cache, sliding-window rate limiting, distributed locks, ephemeral WebSocket presence, and Pub/Sub fanout.
* **Celery + Beat:** Durable asynchronous work for invoices, notifications, reconciliation, market ingestion, settlement jobs, model refreshes, and cleanup tasks.

---

## 2. Service Ownership Rules

The system can share infrastructure, but ownership must remain strict.

### Django Owns Canonical Writes

* User identity, profiles, KYC status, product catalog writes, inventory state, order creation, payment initiation, signed payment webhooks, refunds, rental bookings, auction settlement, invoices, and admin mutations.
* Financial transitions from `pending` to `authorized`, `paid`, `failed`, `refunded`, or `disputed`.
* Durable business events through the PostgreSQL outbox.

### FastAPI Owns Low-Latency Streams

* WebSocket subscriptions, active auction streams, order-book fanout, live ticker fanout, crop scan requests, model inference, and forecast reads.
* Bid placement only through transaction-safe repository code that enforces the same authorization, rate limit, row lock, and idempotency rules as Django.
* No ad hoc SQL that bypasses domain invariants.

### Shared Database Boundary

* Runtime services use separate database roles:
  * `agrimart_django_rw`: application read/write access.
  * `agrimart_fastapi_rw_limited`: approved writes only for bids, AI audit rows, and real-time state snapshots.
  * `agrimart_readonly`: reporting and diagnostics.
  * `agrimart_migrator`: schema migrations only, unavailable to runtime containers.
* Services never auto-run migrations on startup. Migrations are release operations with rollback or forward-fix plans.
* Cross-service durable events use an outbox table. Redis Pub/Sub is only for ephemeral fanout.

---

## 3. Security & Threat Defense Matrix

```text
[Client]
   |
   v
[Edge]
   - TLS 1.3
   - HSTS preload
   - WAF and DDoS protection
   - Global request throttling
   |
   v
[API Gateway / Ingress]
   - Security headers
   - CORS allowlist
   - Request size limits
   - Redis rate limiting
   |
   v
[Application Layer]
   - JWT verification
   - RBAC / ABAC policies
   - BOLA / IDOR checks
   - Strict serializers and schemas
   - Idempotency enforcement
   |
   v
[Data Layer]
   - PostgreSQL constraints
   - Row locks
   - Least-privilege DB users
   - AES-256-GCM field encryption
   - Append-only audit logs
```

### SQL Injection Defense

* No raw string-built SQL. Use Django ORM, SQLAlchemy 2.0 expressions, or parameterized driver calls only.
* Prepared statements are enforced through `psycopg3` and `asyncpg`.
* Runtime DB roles cannot drop tables, alter schema, manage extensions, or access administrative catalog data beyond what the app requires.

### Rate Limiting & Abuse Defense

* Auth and OTP endpoints: 5 attempts per 15 minutes per IP, user, and device fingerprint.
* Failed auth attempts trigger exponential backoff and risk scoring.
* Auction bids: 2 bids per second per merchant per lot.
* Global authenticated API: 120 requests per minute per user token.
* Expensive AI endpoints: per-user, per-IP, and per-device quotas with compute-budget enforcement.

### BOLA / IDOR Elimination

* Every object route validates ownership, role, tenant scope, and verified business status.
* Public URLs use UUIDv7 or opaque Snowflake-style IDs, never sequential integer IDs.
* Querysets are scoped before object lookup, not filtered after retrieval.

```python
lot = AuctionLot.objects.visible_to(request.user).select_for_update().get(id=lot_id)
if not request.user.can_bid_on(lot):
    raise PermissionDenied("Unauthorized auction access")
```

### Cryptography & Token Hardening

* Passwords use Argon2id with `time_cost=3`, `memory_cost=65536`, and `parallelism=4`.
* Access and refresh tokens are signed using EdDSA/Ed25519. `HS256` is not used for production JWTs.
* JWTs include `iss`, `aud`, `sub`, `exp`, `iat`, `jti`, `role`, and key ID (`kid`).
* Public keys are exposed through an internal JWKS endpoint. Old keys remain valid only through the maximum refresh-token lifetime.
* OTP and token comparisons use `hmac.compare_digest`.
* Bank, GST, Aadhaar/Kisan identifiers, and payout details use application-layer envelope encryption with AES-256-GCM.
* Production secrets live in a managed secret store and have owners, rotation schedules, and emergency revoke procedures.

### XSS, CSRF, CORS & Headers

* Django templates retain automatic context-aware escaping.
* DRF and FastAPI return JSON with strict schema validation.
* Cookies use `Secure`, `HttpOnly`, and `SameSite=Strict` wherever possible.
* CORS uses explicit origin allowlists, never wildcard origins with credentials.
* Required headers:
  * `Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; script-src 'self'; object-src 'none'; base-uri 'self';`
  * `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  * `X-Frame-Options: DENY`
  * `X-Content-Type-Options: nosniff`
  * `Referrer-Policy: strict-origin-when-cross-origin`
  * `Permissions-Policy` with unused browser capabilities disabled.

### File Upload & AI Endpoint Defense

* Crop image uploads are validated by extension, MIME header, magic bytes, decoder success, dimensions, and decompression-bomb limits.
* Uploaded files are scanned before permanent storage or downstream sharing.
* AI inference runs in a separate worker pool with CPU/GPU quotas, timeouts, and circuit breakers.
* AI responses are bounded structured JSON. Model output is never trusted for authorization, pricing, chemical guidance, or financial decisions without rule-based validation.

---

## 4. System Architecture Topology

```text
                          [React Frontend - Vite]
                                  |
                 +----------------+----------------+
                 |                                 |
              REST/HTTP                       WebSocket/Async
                 |                                 |
                 v                                 v
        [Django 5 + DRF]                    [FastAPI ASGI]
        - Auth / RBAC                       - Live mandi streams
        - Store orders                      - Auction fanout
        - Rentals                           - Bid ingress
        - Payments                          - Crop AI gateway
        - Admin                             - Forecast reads
                 |                                 |
                 +---------------+-----------------+
                                 |
             +-------------------+-------------------+
             |                   |                   |
             v                   v                   v
       [Celery Workers]      [Redis 7]        [PostgreSQL 16]
       - Invoices            - Cache          - ACID data
       - Notifications       - Pub/Sub        - pgvector
       - Settlements         - Rate limits    - Constraints
       - Reconciliation      - Presence       - Outbox
```

Ingress routes:

* `/api/v1/auth/*`, `/api/v1/store/*`, `/api/v1/rentals/*`, `/api/v1/payments/*`, `/api/v1/admin/*` -> Django.
* `/api/v1/ai/*`, `/api/v1/mandi/forecast/*`, `/ws/*` -> FastAPI.
* Internal service calls require mTLS or signed service tokens.

---

## 5. PostgreSQL Database Schema Design

### Users & Identity

* `users_customuser`: `(id UUID PK, phone VARCHAR(15) UNIQUE, email CITEXT UNIQUE NULL, password_hash VARCHAR, role ENUM('farmer','merchant','admin','support'), full_name VARCHAR, village_pincode VARCHAR(6), is_verified BOOLEAN, last_login_at TIMESTAMPTZ NULL, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ)`
* `users_farmerprofile`: `(user_id UUID FK UNIQUE, farm_acreage DECIMAL CHECK(farm_acreage >= 0), soil_type VARCHAR, irrigation_type VARCHAR, kisan_card_number_ciphertext BYTEA, kisan_card_number_last4 VARCHAR(4))`
* `users_merchantprofile`: `(user_id UUID FK UNIQUE, company_name VARCHAR, apmc_license_no VARCHAR UNIQUE, gst_number_ciphertext BYTEA, gst_number_last4 VARCHAR(4), credit_limit DECIMAL CHECK(credit_limit >= 0), risk_status ENUM('normal','review','blocked'))`
* `users_auditlog`: `(id UUID PK, actor_user_id UUID NULL FK, action VARCHAR, target_type VARCHAR, target_id UUID NULL, ip_address INET, user_agent_hash VARCHAR, metadata_json JSONB, created_at TIMESTAMPTZ)`

### E-Commerce & Inputs

* `store_category`: `(id UUID PK, slug VARCHAR UNIQUE, name VARCHAR, icon VARCHAR, description TEXT)`
* `store_product`: `(id UUID PK, category_id UUID FK, sku VARCHAR UNIQUE, name VARCHAR, price DECIMAL(10,2) CHECK(price >= 0), stock_quantity INT CHECK(stock_quantity >= 0), reserved_quantity INT CHECK(reserved_quantity >= 0), lab_germination_pct DECIMAL CHECK(lab_germination_pct BETWEEN 0 AND 100), purity_rating DECIMAL CHECK(purity_rating BETWEEN 0 AND 100), specifications_json JSONB, is_active BOOLEAN, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ, CHECK(stock_quantity >= reserved_quantity))`
* `store_order`: `(id UUID PK, user_id UUID FK, order_number VARCHAR UNIQUE, total_amount DECIMAL CHECK(total_amount >= 0), currency CHAR(3), order_status ENUM('draft','placed','packed','shipped','delivered','cancelled'), payment_status ENUM('pending','authorized','paid','failed','refunded','disputed'), idempotency_key UUID UNIQUE, delivery_address_json JSONB, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ)`
* `store_orderitem`: `(id UUID PK, order_id UUID FK, product_id UUID FK, quantity INT CHECK(quantity > 0), unit_price DECIMAL CHECK(unit_price >= 0), tax_amount DECIMAL DEFAULT 0, line_total DECIMAL CHECK(line_total >= 0))`
* `store_payment`: `(id UUID PK, order_id UUID FK, provider VARCHAR, provider_payment_id VARCHAR UNIQUE, amount DECIMAL CHECK(amount >= 0), currency CHAR(3), status ENUM('created','authorized','captured','failed','refunded','disputed'), raw_webhook_json JSONB, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ)`
* `store_inventoryledger`: `(id UUID PK, product_id UUID FK, delta_quantity INT, reason ENUM('purchase','reservation','release','sale','refund','manual_adjustment'), reference_type VARCHAR, reference_id UUID, created_at TIMESTAMPTZ)`

### Machinery Rentals

* `rentals_equipment`: `(id UUID PK, name VARCHAR, model VARCHAR, horsepower INT CHECK(horsepower > 0), rental_rate_daily DECIMAL CHECK(rental_rate_daily >= 0), rental_rate_acre DECIMAL CHECK(rental_rate_acre >= 0), driver_daily_fee DECIMAL CHECK(driver_daily_fee >= 0), home_pincode VARCHAR(6), is_available BOOLEAN, maintenance_status ENUM('ready','scheduled','in_service','retired'))`
* `rentals_booking`: `(id UUID PK, user_id UUID FK, equipment_id UUID FK, start_date DATE, end_date DATE, rental_mode ENUM('daily','acreage'), acreage_estimate DECIMAL NULL CHECK(acreage_estimate >= 0), with_driver BOOLEAN, village_pincode VARCHAR(6), total_cost DECIMAL CHECK(total_cost >= 0), booking_status ENUM('pending_payment','confirmed','in_transit','active','completed','cancelled','refunded'), idempotency_key UUID UNIQUE, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ)`
* `rentals_maintenancelog`: `(id UUID PK, equipment_id UUID FK, status VARCHAR, notes TEXT, starts_at TIMESTAMPTZ, ends_at TIMESTAMPTZ NULL, created_by_id UUID FK)`

### Mandi Markets & Auctions

* `mandi_apmc`: `(id UUID PK, name VARCHAR, state VARCHAR, district VARCHAR, market_code VARCHAR UNIQUE, latitude DECIMAL, longitude DECIMAL)`
* `mandi_commodity`: `(id UUID PK, name VARCHAR, code VARCHAR UNIQUE, category VARCHAR, standard_msp_rate DECIMAL CHECK(standard_msp_rate >= 0))`
* `mandi_dailyticker`: `(id UUID PK, mandi_id UUID FK, commodity_id UUID FK, modal_price DECIMAL CHECK(modal_price >= 0), min_price DECIMAL CHECK(min_price >= 0), max_price DECIMAL CHECK(max_price >= min_price), arrivals_volume DECIMAL CHECK(arrivals_volume >= 0), source VARCHAR, recorded_at DATE)`
* `mandi_auctionlot`: `(id UUID PK, farmer_id UUID FK, commodity_id UUID FK, apmc_id UUID FK, quantity_quintals DECIMAL CHECK(quantity_quintals > 0), moisture_pct DECIMAL CHECK(moisture_pct BETWEEN 0 AND 100), reserve_price DECIMAL CHECK(reserve_price >= 0), current_highest_bid DECIMAL CHECK(current_highest_bid >= 0), leading_bid_id UUID NULL FK, status ENUM('draft','active','locked','settled','expired','cancelled'), expires_at TIMESTAMPTZ, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ)`
* `mandi_merchantbid`: `(id UUID PK, lot_id UUID FK, merchant_id UUID FK, bid_amount_per_qtl DECIMAL CHECK(bid_amount_per_qtl > 0), status ENUM('leading','outbid','accepted','rejected','withdrawn'), idempotency_key UUID, created_at TIMESTAMPTZ)`
* `mandi_settlement`: `(id UUID PK, lot_id UUID FK UNIQUE, winning_bid_id UUID FK, gross_amount DECIMAL CHECK(gross_amount >= 0), platform_fee DECIMAL DEFAULT 0, farmer_payout_amount DECIMAL CHECK(farmer_payout_amount >= 0), status ENUM('pending','payable','paid','disputed','cancelled'), created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ)`

### AI, Events & Idempotency

* `ai_cropscan`: `(id UUID PK, user_id UUID FK, image_object_key VARCHAR, model_name VARCHAR, model_version VARCHAR, prediction_json JSONB, confidence DECIMAL CHECK(confidence BETWEEN 0 AND 1), created_at TIMESTAMPTZ)`
* `ai_cropembedding`: `(id UUID PK, crop_scan_id UUID FK, embedding VECTOR(768), created_at TIMESTAMPTZ)`
* `system_outboxevent`: `(id UUID PK, event_type VARCHAR, aggregate_type VARCHAR, aggregate_id UUID, payload_json JSONB, schema_version INT, status ENUM('pending','published','failed'), attempts INT DEFAULT 0, next_attempt_at TIMESTAMPTZ, created_at TIMESTAMPTZ)`
* `system_idempotencykey`: `(id UUID PK, scope VARCHAR, key_hash VARCHAR UNIQUE, request_hash VARCHAR, response_status INT, response_body_json JSONB, expires_at TIMESTAMPTZ, created_at TIMESTAMPTZ)`

### Mandatory Indexes & Constraints

* `users_customuser(phone) UNIQUE`
* `users_customuser(email) UNIQUE WHERE email IS NOT NULL`
* `store_product(category_id, is_active)`
* `store_order(user_id, created_at DESC)`
* `store_payment(provider, provider_payment_id) UNIQUE`
* `rentals_booking(equipment_id, start_date, end_date)` plus a PostgreSQL exclusion constraint preventing overlapping active/confirmed bookings.
* `mandi_dailyticker(mandi_id, commodity_id, recorded_at DESC)`
* `mandi_dailyticker(mandi_id, commodity_id, recorded_at, source) UNIQUE`
* `mandi_auctionlot(status, expires_at)`
* `mandi_merchantbid(lot_id, bid_amount_per_qtl DESC, created_at ASC)`
* `ai_cropembedding` HNSW or IVFFLAT index after enough embeddings exist to tune recall and latency.

---

## 6. Critical Transaction Flows

### Order Placement

1. Validate cart, address, user verification state, product availability, and idempotency key.
2. Open `transaction.atomic()` and lock all selected `store_product` rows in deterministic SKU order.
3. Move available stock to reserved stock through `store_inventoryledger`.
4. Create `store_order`, `store_orderitem`, and `store_payment` in `pending/created` state.
5. Commit transaction and emit `order.created` through the outbox.
6. Payment webhooks finalize payment only after signature verification, replay protection, amount check, and currency check.

### Rental Booking

1. Validate equipment readiness, maintenance windows, user eligibility, and idempotency key.
2. Lock the target `rentals_equipment` row.
3. Enforce non-overlap through database exclusion constraint and service validation.
4. Create booking in `pending_payment`.
5. Confirm after payment capture and emit `booking.confirmed`.

### Auction Bid Placement

1. Validate merchant role, KYC state, APMC license, credit limit, lot status, and bid window.
2. Apply Redis rate limit by merchant and lot.
3. Open transaction and lock the `mandi_auctionlot` row.
4. Reject bids below reserve, below minimum increment, or lower than the current highest bid.
5. Mark previous leading bid as `outbid`, insert new bid as `leading`, update lot snapshot, and commit.
6. Publish ephemeral WebSocket update through Redis and durable `auction.bid_placed` event through outbox.

### Auction Settlement

1. Celery Beat finds expired active lots using `SELECT FOR UPDATE SKIP LOCKED`.
2. Winning bid is frozen and lot moves to `locked`.
3. Settlement row is created exactly once.
4. Farmer payout is released only after delivery/quality confirmation and dispute-window rules.

---

## 7. FastAPI Real-Time & AI Gateway

### WebSockets

* `wss://api.agrimart.in/ws/mandi/feed/`
  * Subscribes to Redis Pub/Sub channel `mandi_realtime_ticks`.
  * Streams commodity prices without polling PostgreSQL.
* `wss://api.agrimart.in/ws/mandi/auction/{lot_id}/`
  * Authenticates the handshake with short-lived JWTs.
  * Checks lot-level read permission before subscription.
  * Sends heartbeat pings every 25 seconds.
  * Disconnects stale clients after 2 missed heartbeats.
  * Enforces max message size, outbound queue limits, and slow-consumer disconnects.

### AI / ML Endpoints

* `POST /api/v1/ai/crop-doctor/scan`
  * Uses PyTorch or ONNX Runtime model serving.
  * Validates file type, size, dimensions, decoder success, and decompression limits.
  * Returns disease class, severity score, confidence, model version, and mapped certified products.
* `GET /api/v1/ai/mandi/forecast/{commodity_id}`
  * Forecasts 14-day APMC modal price trajectories.
  * Returns model version, input window, confidence interval, and freshness timestamp.

### Reliability Controls

* Every endpoint has timeout budgets and structured error envelopes.
* Database sessions are request-scoped and always closed by dependency lifecycle hooks.
* Redis reconnects use exponential backoff with jitter.
* WebSocket nodes are horizontally scalable because presence and fanout state live outside process memory.

---

## 8. Payments, Refunds & Reconciliation

* Payment creation is initiated server-side. Clients never submit trusted payment amounts.
* Webhooks verify provider signature, timestamp tolerance, event ID uniqueness, expected amount, expected currency, and valid target state.
* Webhooks are idempotent. Duplicate events return success after confirming the existing final state.
* Refunds are first-class records, not negative payments.
* Daily reconciliation compares provider reports with `store_payment` rows and raises admin-visible exceptions for missing, duplicated, or amount-mismatched transactions.
* Fulfillment waits for `captured/paid`, never client-side success alone.

---

## 9. Observability, Audit & Operations

### Logs

* JSON structured logs across Django, FastAPI, Celery, ingress, and workers.
* Every request and job carries `trace_id`, `user_id`, `role`, `ip`, `route`, `latency_ms`, `status_code`, and `error_code`.
* Sensitive values are redacted in logging middleware before emission.

### Metrics

* API RED metrics: rate, errors, duration.
* Infrastructure USE metrics: utilization, saturation, errors.
* Domain metrics: bid acceptance latency, payment webhook lag, stock reservation failures, booking conflicts, crop scan inference time, forecast freshness, settlement delay.

### Alerts

* Page immediately on payment webhook failure spikes, database primary unavailable, Redis unavailable during active auctions, p95 bid latency above SLO, auth brute-force surge, failed backup verification, and settlement job failures.
* Warn on queue depth growth, worker retries, slow DB queries, high 5xx rate, low disk, certificate expiry, and model error drift.

### Audit

* Admin actions, KYC changes, payment state changes, refunds, manual inventory adjustments, payout changes, role changes, and permission changes are immutable audit events.
* Audit logs are append-only and queryable by actor, target, action, time, and IP.

---

## 10. Deployment, Runtime & Data Protection

### Runtime Topology

* Nginx or managed ingress terminates TLS and routes traffic to Django or FastAPI.
* Django runs under Gunicorn with measured worker count and database pool limits.
* FastAPI runs under Uvicorn workers behind an ASGI-capable ingress.
* Celery queues are split by workload: `critical`, `default`, `notifications`, `ai`, and `reconciliation`.

### Release Discipline

* Migrations follow expand, deploy, migrate data, contract.
* Feature flags gate risky behavior such as new auction rules, payment providers, and model versions.
* Blue/green or rolling deployment is allowed only when old and new app versions can both read/write the transitional schema.

### Backups & Disaster Recovery

* PostgreSQL uses continuous WAL archiving, daily encrypted snapshots, and quarterly restore drills.
* Redis is disposable for cache and Pub/Sub, but rate-limit and idempotency degradation must fail closed for risky mutations.
* RPO: 15 minutes for PostgreSQL.
* RTO: 60 minutes for core commerce and rentals.
* RTO: 15 minutes for active auctions during mandi market hours.

### Privacy Baseline

* PII is minimized, encrypted, masked in admin, and access-controlled.
* Temporary upload objects, expired OTPs, stale sessions, and old raw webhook payloads are cleaned by scheduled jobs.
* Export/delete workflows account for active disputes, payment audit retention, and legal retention requirements.

---

## 11. Phased Implementation Roadmap

* **Phase 1: Environment & PostgreSQL Hardening**
  * Docker Compose with PostgreSQL 16 + pgvector, Redis 7, Django, FastAPI, Celery, and local object storage.
  * Custom user model, Argon2id, EdDSA JWTs, Redis refresh-token tracking, and strict settings split.
* **Phase 2: Django Core Domain**
  * Products, inventory ledger, orders, payments, machinery rentals, admin screens, and audit logs.
  * ACID flows with `select_for_update`, idempotency keys, and database constraints.
* **Phase 3: FastAPI Gateway**
  * WebSocket auction rooms, ticker feed, bid ingress, Redis Pub/Sub fanout, heartbeat handling, and rate limits.
* **Phase 4: AI/ML Pipeline**
  * Crop Doctor inference endpoint, upload scanner, model versioning, pgvector storage, and mandi forecasting.
* **Phase 5: Payments & Reconciliation**
  * Signed webhooks, refund workflow, provider reconciliation, dead-letter handling, and admin exception queue.
* **Phase 6: Outbox & Async Reliability**
  * Outbox publisher, idempotent consumers, Celery queue split, retry policy, and scheduled settlement jobs.
* **Phase 7: Production Readiness**
  * OpenTelemetry traces, Prometheus metrics, dashboards, alert rules, runbooks, restore drill, failover drill, and migration drill.

---

## 12. Production Acceptance Checklist

The backend is not production-ready until these gates pass:

* **Security:** OWASP API Top 10 checks, dependency scanning, secret scanning, JWT algorithm tests, CSRF/CORS checks, file-upload abuse tests, and admin permission review.
* **Data integrity:** Order, payment, booking, bid, settlement, and inventory state machines have database constraints and service transition tests.
* **Concurrency:** Parallel checkout, parallel booking, and parallel auction-bid tests prove no oversell, double booking, duplicate charge, or stale leading bid.
* **Performance:** p95 REST latency under 250 ms, p95 bid placement under 150 ms inside region, and WebSocket fanout under 500 ms for subscribed clients.
* **Reliability:** Celery retries are idempotent, dead-letter queues are monitored, migrations are reversible or forward-fixable, and backup restore is verified.
* **Operations:** Dashboards, runbooks, alerts, audit views, and emergency disable flags exist before public launch.
* **AI/ML:** Model versioning, dataset lineage, inference timeout, confidence threshold, fallback response, and human-review path exist for low-confidence diagnosis.

---

## 13. Minimum Test Matrix

### Unit Tests

* Model constraints, serializers, Pydantic schemas, permission policies, token validation, idempotency hashing, payment signature verification, and price calculation.

### Integration Tests

* Order creation with stock reservation, payment webhook finalization, refund workflow, rental booking overlap rejection, auction bid ordering, outbox publish/consume, and AI scan storage.

### Security Tests

* SQL injection payloads, BOLA/IDOR route access, JWT algorithm confusion, expired/revoked tokens, OTP brute force, decompression bombs, malicious MIME spoofing, CORS origin rejection, and CSRF behavior.

### Load & Race Tests

* 1,000-user browsing test, 100 concurrent checkout attempts on low stock, 100 concurrent rental attempts for the same equipment/date, 500 WebSocket clients on one auction lot, and burst bid-sniping simulation.

### Recovery Tests

* Redis restart during WebSocket traffic, Celery worker crash during payment handling, duplicate webhook replay, PostgreSQL failover, failed migration forward-fix, object-storage temporary outage, and backup restore validation.
