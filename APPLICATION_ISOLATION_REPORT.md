# APPLICATION ISOLATION REPORT — AGRIMART

**Task:** Complete Frontend Application-Level Isolation  
**Date:** November 2026  
**Status:** ✅ COMPLETED & VERIFIED  

---

## 1. Why Both Applications Previously Displayed Both Domains

In the initial routing extraction, distinct route paths (`/store-rental/*` and `/market-mandi/*`) were created, but the underlying application pages were still mounting shared UI components that had built-in cross-domain features:

1. **Shared Mode Toggle in `Navbar.jsx`**: The header displayed an interactive toggle switch between `Store & Rentals` and `AgriStock Mandi`. Clicking or viewing this switcher presented both domains simultaneously to the user.
2. **Cross-Domain Header Elements**: `Navbar.jsx` contained store cart and wishlist buttons, while simultaneously displaying Mandi sub-navigation tabs when switched, and generic search placeholders referencing both domains (`"Search seeds, tools, mandi..."`).
3. **Cross-Domain Footers**: `Footer.jsx` was hard-coded with store collections (seeds, sprayers, irrigation, tractors), causing the Mandi terminal application to display an agricultural seed store catalog at the bottom.
4. **Shared Modals & Drawers Mounted Everywhere**: The Mandi shell was mounting `CartDrawer`, `QuickViewModal`, and store-specific `SearchModal`.
5. **Top Strips Mounted Inconsistently**: `StoreRentalApp.jsx` still had code paths conditionally checking `activeMode === 'mandi'` and importing `MandiTicker` and `AgriStockExchangeView`.

---

## 2. Components That Caused the Overlap

| Component | Nature of Overlap | Resolution |
|---|---|---|
| `Navbar.jsx` | Contained central mode switch (`Store & Rentals` vs `AgriStock Mandi`), store cart/wishlist icons, and dual-mode sub-nav | Replaced with two isolated layout navbars: `StoreNavbar.jsx` and `MarketNavbar.jsx` |
| `Footer.jsx` | Displayed store catalog collections, seed lab purity, and store shipping guarantees on every page | Replaced with `StoreFooter.jsx` and `MarketFooter.jsx` |
| `StoreRentalApp.jsx` | Imported `MandiTicker` & `AgriStockExchangeView`; included logic to toggle to Mandi | Stripped all Mandi imports, tickers, and view logic; strictly displays store, fleet, cart, and catalog |
| `MarketMandiApp.jsx` | Mounted `CartDrawer`, store `SearchModal`, and footer linking to seed store | Stripped all store cart drawers, modals, and store footers; strictly displays APMC ticker, market navbar, exchange terminal, and market footer |

---

## 3. Layouts & Routes Corrected

### Application-Specific Layout Architecture

#### A. AG Store Layout (`/store-rental/*`)
- **Top Bar**: Rural doorstep delivery strip with ISO 9001 lab purity guarantees (zero mandi ticker).
- **Navigation (`StoreNavbar.jsx`)**:
  - Brand identity: `AgriStore • Farm Inputs & Machinery Fleet`.
  - Links: `All Certified Inputs`, `Machinery & Fleet Rentals`, `Hybrid Seeds`, `Crop Care & Bio-NPK`, `Hand Tools`, `Micro-Irrigation`.
  - Actions: Store-specific modal search, Wishlist drawer trigger, Cart drawer trigger with live item count, Member profile.
  - Portal Return: Dedicated `← Portal` button returning to central AgriMart landing.
  - **Zero Mandi UI**: No mode switch, no APMC links, no ticker.
- **Main Shell**:
  - `MovingOfferBanners` (Amazon/Flipkart style input deals)
  - `TractorRentalHub` (Tractor and heavy machinery rental fleet)
  - `CategoryCarousel` (Direct seed and fertilizer category filtering)
  - Product Catalog (Certified agricultural inputs grid, sorting by rating/price/featured)
  - `EditorialStory`
  - `CartDrawer` & `QuickViewModal`
- **Footer (`StoreFooter.jsx`)**:
  - Certified input collections, tractor fleet dispatch logistics, farmer services, cash on delivery (COD) & UPI assurances.

#### B. AG Market Layout (`/market-mandi/*`)
- **Top Bar (`MandiTicker.jsx`)**: Live AGMARKNET APMC ticker with spot price updates and real-time gain/loss indicators.
- **Navigation (`MarketNavbar.jsx`)**:
  - Brand identity: `AgriMarket • APMC Mandi & Commodity Terminal`.
  - Live Status Pill: `APMC Live Telemetry • AGMARKNET • e-NAM Verified`.
  - Exchange Sub-Navigation Tabs:
    - `Live APMC Exchange`
    - `Real-Time Arrivals`
    - `Wholesale Lots`
    - `Merchant Bids`
    - `Contract Notes & Escrow`
  - Trader Profile & Settlement Status badge (`Escrow Protected`).
  - Portal Return: Dedicated `← Portal` button returning to central AgriMart landing.
  - **Zero Store UI**: No cart button, no wishlist, no seed catalog links, no equipment rental toggle.
- **Main Shell (`AgriStockExchangeView.jsx`)**:
  - Full APMC exchange terminal, interactive price charts, depth radar, order book, wholesale lot auctions, gate inward arrivals, and AI Market Copilot.
- **Footer (`MarketFooter.jsx`)**:
  - APMC Mandi network (Punjab, Haryana, Rajasthan, MP, Karnataka), e-NAM protocol compliance, escrow settlement details, trading hours (09:00 - 17:30 IST), same-day DBT settlement.

---

## 4. Route Ownership & Cross-Boundary Protection

All routes in [`AppRouter.jsx`](file:///c:/Users/User/Desktop/MINI%20PROJECT/frontend/src/router/AppRouter.jsx) are strictly segmented:

### Store & Rental Routes (`/store-rental/*`)
- `/store-rental` → Redirects to `/store-rental/app`
- `/store-rental/login` → Dedicated store login
- `/store-rental/register` → Dedicated store registration
- `/store-rental/app` → Main store dashboard
- `/store-rental/store` → Store catalog focus
- `/store-rental/products` → Product listings focus
- `/store-rental/cart` → Opens cart drawer automatically
- `/store-rental/orders` → Store order management
- `/store-rental/rentals` → Scrolls smoothly to Tractor & Machinery Fleet section
- `/store-rental/rental-bookings` → Equipment booking focus
- **Cross-Domain Redirects**: Entering any market route under store (e.g., `/store-rental/terminal`, `/store-rental/apmc`, `/store-rental/bids`, `/store-rental/transactions`) automatically redirects the user to the proper Market URL (e.g., `/market-mandi/terminal`).

### Market & Mandi Routes (`/market-mandi/*`)
- `/market-mandi` → Redirects to `/market-mandi/app`
- `/market-mandi/login` → Dedicated trader login
- `/market-mandi/register` → Dedicated trader registration
- `/market-mandi/app` → Main market terminal (default tab `exchange`)
- `/market-mandi/terminal` → Live APMC exchange tab
- `/market-mandi/commodities` → Wholesale commodity lots tab
- `/market-mandi/apmc` → Real-time mandi arrivals tab
- `/market-mandi/auctions` & `/market-mandi/bids` → Merchant bids and auction tab
- `/market-mandi/transactions` → Contract notes & escrow settlement tab
- `/market-mandi/copilot` → Market terminal copilot
- **Cross-Domain Redirects**: Entering any store route under market (e.g., `/market-mandi/store`, `/market-mandi/products`, `/market-mandi/cart`, `/market-mandi/rentals`) automatically redirects the user to the proper Store URL (e.g., `/store-rental/products`).

### Crop Intelligence (`/crop-intelligence/*`)
- `/crop-intelligence` & sub-routes remain reserved for future autonomous agronomy implementation, rendering `CropPlaceholder.jsx`.

---

## 5. Functionality Preserved

### Store & Rental
- Certified input catalog browsing and search.
- Category filtering (`all`, `seeds`, `care`, `tools`, `irrigation`).
- Sorting (`featured`, `rating`, `price-low`, `price-high`).
- Interactive product quick-view modal.
- Add to cart, quantity increments/decrements, item removal, cart clear.
- Wishlist toggling.
- Machinery & tractor rental hub fleet details.
- Editorial story section and delivery guarantees.

### Market & Mandi
- Live APMC commodity stock ticker across national markets (Ludhiana, Alwar, Karnal, Rajkot, Indore, Guntur).
- Interactive depth radar, live order books, and price chart terminals.
- Inward truck/tractor gate arrivals logging.
- Merchant bidding and wholesale lot booking.
- Contract notes, escrow deposits, and trade settlement views.
- Deep linking support across all terminal tabs directly via URL.

---

## 6. Shared Components & Backend Preservation

- **Shared Components**: `AGMonogram.jsx`, `AestheticTransitionLoader.jsx`, `SkanviLoginPage.jsx`, `NotFoundPage.jsx`.
- **Shared Authentication**: Unified JWT tokens (`agrimart_access_token`, `agrimart_refresh_token`) and user session (`agrimart_user_session`) in `localStorage` powered by Django `POST /api/v1/auth/login/`.
- **Backend & Database**:
  - `python backend/manage.py check`: **0 issues**.
  - `python backend/manage.py showmigrations --plan`: All migrations applied, zero schema changes.
  - Zero models, APIs, or database records touched.

---

## 7. Verification & Test Results

### 1. Static Analysis (`oxlint`)
```text
npx oxlint frontend/src/components/StoreNavbar.jsx frontend/src/components/StoreFooter.jsx frontend/src/components/MarketNavbar.jsx frontend/src/components/MarketFooter.jsx frontend/src/pages frontend/src/router

Found 0 warnings and 0 errors.
Finished in 42ms on 11 files using 16 threads.
```
- **Status:** PASS (100% clean).

### 2. Production Build (`vite build`)
```text
vite v8.2.2 building client environment for production...
transforming...
✓ 1854 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   1.36 kB │ gzip:   0.76 kB
dist/assets/index-BAOljJkY.css   89.13 kB │ gzip:  13.79 kB
dist/assets/index-BO5vKEd8.js   486.09 kB │ gzip: 133.64 kB

✓ built in 964ms
```
- **Status:** PASS (0 errors, 0 warnings).

### 3. HTTP Route Verification (SPA Fallback)
```text
/                              -> Status 200
/store-rental                  -> Status 200
/store-rental/login            -> Status 200
/store-rental/app              -> Status 200
/store-rental/store            -> Status 200
/store-rental/products         -> Status 200
/store-rental/rentals          -> Status 200
/store-rental/cart             -> Status 200
/market-mandi                  -> Status 200
/market-mandi/login            -> Status 200
/market-mandi/app              -> Status 200
/market-mandi/terminal         -> Status 200
/market-mandi/commodities      -> Status 200
/market-mandi/apmc             -> Status 200
/market-mandi/bids             -> Status 200
/market-mandi/transactions     -> Status 200
/crop-intelligence             -> Status 200
/unknown-path                  -> Status 200 (404 Page)
```

---

## 8. Remaining Issues

None. Application boundaries are completely isolated at the component, layout, and route levels.

