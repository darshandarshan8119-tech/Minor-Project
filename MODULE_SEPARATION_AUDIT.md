# MODULE SEPARATION AUDIT — AGRIMART
**Date:** November 2026  
**Pre-Change Commit:** `ebf0ed3`  
**Pre-Change Build:** ✅ PASS (1838 modules, 427 KB JS, 88 KB CSS, 860ms)  
**Pre-Change Migrations:** All applied (users, store, rentals, mandi, ai, common)

---

## 1. Current Frontend Architecture

### Routing Model
**No router library installed.** The app uses manual `useState`-driven view switching:
- `currentView = 'landing'` → `AgriMartLandingPage`
- `currentView = 'login'` → `SkanviLoginPage`
- `currentView = 'app'` → Post-login shell with `activeMode` toggle

`activeMode` toggles between `'store'` and `'mandi'` inside the post-login shell.

**No URL-based routing exists.** Browser URL is always `/`. No deep links. No history-based navigation.

### Component Ownership Classification

| Component | Domain | Shared? |
|---|---|---|
| `AgriMartLandingPage.jsx` | Landing (central gateway) | Shared |
| `AGMonogram.jsx` | Landing (brand identity) | Shared |
| `SkanviLoginPage.jsx` | Authentication | Shared |
| `Interactive3DLoginPage.jsx` | Authentication (alt) | Shared |
| `AestheticTransitionLoader.jsx` | UI transition | Shared |
| `Navbar.jsx` | Post-login navigation | Shared (mode-aware) |
| `Footer.jsx` | Post-login footer | Shared |
| `SearchModal.jsx` | Post-login search | Shared |
| `MovingOfferBanners.jsx` | **Store** | Store |
| `TractorRentalHub.jsx` | **Store** (rentals) | Store |
| `CategoryCarousel.jsx` | **Store** | Store |
| `CategoryBar.jsx` | **Store** | Store |
| `ProductCard.jsx` | **Store** | Store |
| `QuickViewModal.jsx` | **Store** | Store |
| `CartDrawer.jsx` | **Store** | Store |
| `EditorialStory.jsx` | **Store** | Store |
| `BentoHero.jsx` | **Store** | Store |
| `SkanviHero.jsx` | **Store** | Store |
| `TrustBento.jsx` | **Store** | Store |
| `FarmerTestimonials.jsx` | **Store** | Store |
| `AgriStockExchangeView.jsx` | **Market** (119 KB — massive) | Market |
| `MandiMarketTerminal.jsx` | **Market** | Market |
| `MandiTicker.jsx` | **Market** | Market |
| `CropDoctorScanner.jsx` | **Crop** (future) | Crop |

### Data & Services
| File | Domain |
|---|---|
| `mockData.js` | Store (products, categories, reviews) |
| `api.js` | Shared (auth, store, rentals, mandi) |

### Key Observation
All state (auth, cart, wishlist, products, mode) lives in `App.jsx` as `useState` hooks. There is **no Context provider, no Redux, no Zustand**. The entire state tree is prop-drilled from `App.jsx`.

---

## 2. Current Backend Architecture

### Django Apps
| App | Purpose | API Prefix |
|---|---|---|
| `users` | Auth, CustomUser, FarmerProfile, MerchantProfile | `/api/v1/auth/` |
| `store` | Products, Categories, Inventory | `/api/v1/store/` |
| `rentals` | Equipment, Bookings | `/api/v1/rentals/` |
| `mandi` | Commodities, APMCs, Tickers, AuctionLots, Bids | `/api/v1/mandi/` |
| `common` | UUIDPrimaryKeyModel, middleware, permissions | (shared base) |
| `ai` | ML models (crop recommender, disease detector) | `/api/v1/ai/` (registered in ai/urls.py but NOT mounted in agrimart/urls.py) |

### Authentication
- **Single user model:** `users.CustomUser` (AbstractUser + UUID PK)
- **Auth method:** JWT via `rest_framework_simplejwt`
- **Token storage:** `localStorage` keys `agrimart_access_token`, `agrimart_refresh_token`
- **Roles:** `farmer`, `merchant`, `admin`, `support`
- **Login endpoint:** `POST /api/v1/auth/login/` (unified, accepts phone or email)

### Shared Resources
- `CustomUser` model → used by store (Order FK), rentals (Booking FK), mandi (AuctionLot/Bid FK)
- `UUIDPrimaryKeyModel` → base for all models
- JWT tokens → used by all API calls
- `api.js` → single frontend API client for all domains

---

## 3. Risk Assessment & Proposed Strategy

### Critical Risk: No Router
The app has **no URL router**. Installing `react-router-dom` and converting from `useState` view switching to URL-based routing is the single biggest change. This is necessary for the required route structure but must be done surgically.

### Strategy: Minimal-Invasive Router Introduction
1. Install `react-router-dom` (single new dependency — required for URL-based routing)
2. Create a thin `AppRouter.jsx` that maps URL paths to existing components
3. Keep `App.jsx` as the **post-login application shell** (store + mandi mode switching) — do not rewrite it
4. Create thin wrapper pages that compose existing components under new routes
5. **Do NOT move files into subdirectories** — the existing flat `components/` structure works and moving files risks breaking 20+ import paths for zero functional gain
6. Backend: **zero changes** — all API endpoints stay exactly where they are

### What Changes vs What Stays

| Item | Action |
|---|---|
| `main.jsx` | Wrap in `BrowserRouter` |
| `App.jsx` | Becomes the post-login shell, rendered at `/store-rental/app` and `/market-mandi/app` |
| `AgriMartLandingPage.jsx` | Rendered at `/` — unchanged |
| `SkanviLoginPage.jsx` | Rendered at `/store-rental/login` and `/market-mandi/login` — unchanged component |
| `vite.config.js` | Add SPA fallback for client-side routing |
| Backend | **No changes** |
| Database | **No changes** |
| Migrations | **No changes** |

### Files to Create (New)
1. `src/router/AppRouter.jsx` — route definitions
2. `src/pages/StoreApp.jsx` — thin wrapper extracting store mode from App shell
3. `src/pages/MarketApp.jsx` — thin wrapper extracting mandi mode from App shell
4. `src/pages/CropPlaceholder.jsx` — reserved placeholder page
5. `src/pages/NotFound.jsx` — 404 page

### Files NOT Moved or Deleted
Every existing component file stays in `src/components/`. No file moves. No deletions.

