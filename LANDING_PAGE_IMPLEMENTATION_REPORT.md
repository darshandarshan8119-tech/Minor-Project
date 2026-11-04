# AGRIMART — Multi-Application Landing Page Implementation Report
**Document ID:** AGRIMART-LANDING-RPT-001  
**Author:** AI Systems Engineering & UI Architecture  
**Status:** Complete & Verified  
**Date:** November 2026  

---

## 1. Executive Summary

The central landing page for **AgriMart** has been completely overhauled into a high-end, cinematic AgriTech gateway. AgriMart serves as the unified parent ecosystem housing three independent applications:

1. **AG Store** — Agricultural Commerce, Hybrid Certified Inputs & Heavy Machinery Fleet Rentals.
2. **AG Market** — National APMC Mandi Commodity Exchange, Live Order Books & AI Market Copilot.
3. **AG Crop** — Autonomous Agronomy, Hyperspectral Leaf Pathology & Soil Telemetry.

The design utilizes bespoke generated master artwork, an architectural SVG **AG monogram** brand identity, fluid 3D pointer-physics card tilt with real-time glare projection, restrained micro-interactions, responsive grid scaling, and zero third-party animation bloat.

---

## 2. Files Changed & New Components

### 2.1 Files Modified
* **`frontend/src/App.jsx`**:
  * Wired `targetAppMode` state to synchronize entry intent (`store` vs `mandi`).
  * Connected `onNavigateRoute` and `onEnterPlatform` callbacks to transition directly into the requested module session while preserving dedicated authentication flows.
* **`frontend/src/index.css`**:
  * Integrated architectural motion keyframes: `@keyframes kenburns-slow` (18s cinematic pan/zoom) and `@keyframes ambient-shimmer`.
  * Enforced strict `@media (prefers-reduced-motion: reduce)` accessibility overrides to disable heavy transforms for users requesting reduced motion.

### 2.2 New Components Created
* **`frontend/src/components/AGMonogram.jsx`**:
  * Precision SVG architectural brand mark combining geometric 'A' cantilever strokes, interlocking 'G' harvest arc, central sprout pivot, and subtle radiant glow filters.
  * Supports dynamic themes: `terracotta`, `emerald`, `amber`, and `white`.
* **`frontend/src/components/AgriMartLandingPage.jsx`**:
  * Root landing page component featuring:
    * Top architectural dispatch banner.
    * Minimalist header navigation with AG monogram and live status ping.
    * Monumental hero section featuring the ultra-wide cinematic landscape artwork.
    * 4 Key Architectural scale metrics (`2,400+ Mandis`, `1.42L Qtl Liquidity`, `98% Germination`, `0% Brokerage`).
    * Three independent `ApplicationTiltCard` product cards.
    * Skanvi architectural philosophy section.
    * Live AGMARKNET APMC ticker floor finale.
    * Minimalist brand footer.
    * Preservation modal preview for **AG Crop Intelligence**.

---

## 3. Custom Artwork Generation & Asset Inventory

All artworks were uniquely generated for this platform. **Zero stock photographs, Unsplash, or generic internet assets were used.**

### 3.1 Master and Web-Optimized Image Specifications

| Asset Name | Target Module | Native Master Format | Web Format | Native Dimensions | Aspect Ratio | Master Size | Web Size | Encoding Settings |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `agrimart-hero` | Hero Showcase | PNG (Lossless) | WebP | 1376 × 768 px | 1.79:1 (16:9) | 1.70 MB | 255.2 KB | WebP Q=90, Method=6 |
| `ag-store` | AG Store | PNG (Lossless) | WebP | 1376 × 768 px | 1.79:1 (16:9) | 1.91 MB | 328.9 KB | WebP Q=90, Method=6 |
| `ag-market` | AG Market | PNG (Lossless) | WebP | 1376 × 768 px | 1.79:1 (16:9) | 1.89 MB | 301.1 KB | WebP Q=90, Method=6 |
| `ag-crop` | AG Crop | PNG (Lossless) | WebP | 1376 × 768 px | 1.79:1 (16:9) | 1.79 MB | 263.6 KB | WebP Q=90, Method=6 |

### 3.2 8K Native Resolution Assessment
* **Native Generation Status:** The image generation engine produced native masters at **1376 × 768 px** (cinematic 16:9 ratio, ~1.06 Megapixels) with clean dynamic range and zero textual artifacts or watermarks.
* **Master Preservation:** True 8K native generation (7680 × 4320 px) is not directly output by the current single-pass diffusion pipeline without synthetic interpolation. Rather than applying artificial bicubic/lanczos software upscaling that creates synthetic blur, the untouched native masters are archived cleanly as PNG files in `frontend/public/assets/master/`.
* **Delivery Tier:** Web-optimized derivatives were compressed via Pillow at 90% quality WebP with effort factor 6, yielding a **~85% payload reduction** (from ~7.3 MB master pool down to ~1.1 MB total web footprint) while preserving micro-texture fidelity on high-DPI Retina screens.

---

## 4. Interaction & Motion Design

1. **Card Tilt Physics:**
   * Calculated via normalized pointer displacement `(clientX - rect.left) / width` with an intentional maximum tilt limit of **±5.5°**.
   * Employs CSS 3D transforms (`perspective(1200px) rotateX(...) rotateY(...) scale3d(1.018, 1.018, 1)`) computed on requestAnimationFrame boundaries.
2. **Kinetic Glare Highlight:**
   * Dynamic radial gradient scrim tracking cursor percentage coordinates with smooth opacity fade (`0%` idle to `22%` active).
3. **Hardware Acceleration:**
   * All dynamic transitions rely exclusively on GPU-composited properties: `transform`, `opacity`, and `box-shadow`.
   * `will-change: transform` declared on active interactive surfaces.
4. **Accessibility:**
   * Media query `@media (prefers-reduced-motion: reduce)` bypasses 3D tilt, infinite transforms, and smooth scrolling for motion-sensitive users.

---

## 5. Routes & Application Entry Architecture

| Portal Card | Intent | Target Path | Platform Behavior |
| :--- | :--- | :--- | :--- |
| **AG Store** | Machinery & Certified Inputs | `/store-rental/login` | Updates `targetAppMode = 'store'`, triggers aesthetic transition loader, opens Skanvi Login; post-authentication lands directly on Store & Rental Catalog. |
| **AG Market** | APMC Mandi & AI Copilot | `/market-mandi/login` | Updates `targetAppMode = 'mandi'`, triggers APMC synchronization loader, opens Skanvi Login; post-authentication lands directly on AgriStock Terminal. |
| **AG Crop** | Autonomous Agronomy | `/crop-intelligence/login` | Activates interactive high-fidelity **Suite Preview Modal** detailing leaf pathology and soil balancer pilot testbeds; updates browser history hash `#crop-intelligence/login` without breaking navigation. |

---

## 6. Preservation & Safety Contract Compliance

* **Authentication Pages:** `SkanviLoginPage.jsx` and `Interactive3DLoginPage.jsx` were **not modified**; credentials and member authentication state remain 100% intact.
* **Store & Rental Subsystem:** All product catalogs, tractor rental booking logic, cart drawer, and category filters remain untouched.
* **Market & Mandi Subsystem:** All live APMC order book feeds, weighbridge models, and trading terminal views remain untouched.
* **Backend & Database:** No Django models, database schemas, or API endpoints were altered.

---

## 7. Verification & Build Results

* **Linter Status (`oxlint`):** `src/components/AgriMartLandingPage.jsx` and `src/components/AGMonogram.jsx` passed with **0 warnings and 0 errors**.
* **Production Build (`vite build`):**
  ```bash
  vite v8.2.2 building client environment for production...
  transforming...
  ✓ 1838 modules transformed.
  rendering chunks...
  dist/index.html                   1.36 kB │ gzip:   0.76 kB
  dist/assets/index-B6LbJXe_.css   88.33 kB │ gzip:  13.59 kB
  dist/assets/index-BAzw8HAN.js   426.98 kB │ gzip: 116.63 kB
  ✓ built in 995ms
  ```

---

## 8. Known Limitations
1. **AG Crop Subsystem:** The AG Crop module is in architectural design phase per project charter; the landing page provides a dedicated preview modal and route anchor rather than a live mock backend.
2. **Master Resolution:** Native generation produced 1376 × 768 px source frames rather than uncompressed 8K UHD. If 8K is required in subsequent phases, an offline Real-ESRGAN or Latent Upscaler pass can be applied to the master archive.

