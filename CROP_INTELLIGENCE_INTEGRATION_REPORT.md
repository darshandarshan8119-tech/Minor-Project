# AG CROP — CROP INTELLIGENCE APPLICATION INTEGRATION REPORT
**AgriMart Platform &bull; Autonomous Agronomy & Plant Pathology Suite**
*Date: November 2026 | Environment: AgriMart Minor Project Target*

---

## 1. Executive Summary & Architectural Objective

The Crop Intelligence application (**AG Crop**) has been successfully established and activated as the **third independent, fully functional application** within the AgriMart platform (`C:\Users\User\Desktop\MINI PROJECT\`), operating alongside **AG Store** (`/store-rental/*`) and **AG Market** (`/market-mandi/*`).

```
                              AGRIMART PLATFORM
                    ┌─────────────────┴─────────────────┐
                    │       Central Landing Portal       │
                    │         http://localhost:5173/     │
                    └─────────────────┬─────────────────┘
         ┌────────────────────────────┼────────────────────────────┐
         ▼                            ▼                            ▼
   ┌───────────┐                ┌───────────┐                ┌───────────┐
   │  AG STORE │                │ AG MARKET │                │  AG CROP  │
   │  /store-  │                │  /market- │                │   /crop-  │
   │  rental/* │                │   mandi/* │                │intellig..*│
   └───────────┘                └───────────┘                └───────────┘
         │                            │                            │
   Equipment, Seeds,           Mandi Terminal,              Leaf Scanner,
   Fertilizers, Orders         APMC Depth, Copilot          Soil Matrix, SHC
```

### Core Tenet: Real Backend Intelligence Over Frontend Mocks
In the source project (`VIBEATHON 2026\AgriMart-Market-Intelligence`), Crop Intelligence existed strictly as client-side visual prototypes:
- **Disease scanner**: Ran a `setTimeout` with filename substring matching against 5 static items in `diseaseData.js`.
- **Crop recommendation**: Ran client-side `if/else` checks against 4 static cards with synthetic percentages in `cropRecommendationData.js`.
- **Zero persistence**: Scans and recommendations were lost on refresh.

**In this integration:**
1. Reused the aesthetic Scandinavian frontend design language from VIBEATHON.
2. Replaced all synthetic mock functions with authenticated REST API endpoints in Django.
3. Activated deterministic agronomic scoring based on ICAR standards (Soil Health Index 0-100, NPK balancing, CIB-RC verified active chemical ingredients and biological controls).
4. Persisted all scans, Soil Health Card assays, and crop recommendation records to relational SQLite database models with foreign-key linkage to the authenticated user.
5. Strictly preserved all existing AG Store, AG Market, and Market Copilot codebases with zero collateral regressions.

---

## 2. Source vs Target Architectural Comparison

| Dimension | Source (`VIBEATHON 2026`) | Target (`MINI PROJECT`) Active Implementation |
| :--- | :--- | :--- |
| **Architectural Role** | Monolithic mixed demo page | **Isolated Application Submodule** (`/crop-intelligence/*`) |
| **Disease Inference** | Client-side `setTimeout` substring match | **Server-side validation & ICAR pathology taxonomy** (`/api/v1/crop-intelligence/disease-scan/`) |
| **Image Validation** | None (any uploaded file pretended to be a diseased leaf) | **Visual heuristic leaf checks & rejection handler** (`DiseaseImageRejected` & low-confidence filter) |
| **Clinical Symptom Matcher** | None | **Interactive symptom questionnaire modal** (`/api/v1/crop-intelligence/symptom-lookup/`) |
| **Crop Recommendation** | Client-side static array `calculateCropRecommendation()` | **Server-side deterministic agronomic rules** (`/api/v1/crop-intelligence/recommend/`) |
| **Soil Health Index (SHI)** | Synthetic hardcoded percentages | **Calibrated formula** evaluating N, P, K, and pH deviation |
| **Soil Health Card (SHC)** | Non-existent | **Automated OCR parser & farmer verification workflow** (`/api/v1/crop-intelligence/soil-report/`) |
| **Data Persistence** | None (in-memory state) | **Relational Django models** (`CropScan`, `SoilReport`, `CropRecommendationRecord`) |
| **Cross-Module Linkage** | Mock links | **Deep links** to AG Store products (`/store-rental/products?q=...`) and AG Market depth (`/market-mandi/terminal?q=...`) |

---

## 3. Frontend Architecture & Component Directory

All AG Crop frontend components are located exclusively under `frontend/src/apps/crop-intelligence/`:

```
frontend/src/apps/crop-intelligence/
├── CropIntelligenceApp.jsx            # Application shell & URL tab synchronizer
├── components/
│   ├── CropNavbar.jsx                 # Dedicated header, portal back-button, subnav tabs
│   └── CropFooter.jsx                 # Agronomy suite footer with ICAR advisory notice
└── pages/
    ├── DiseaseDetectionPage.jsx       # Plant pathology scanner, clinical symptom modal
    ├── CropRecommendationPage.jsx     # Soil NPK matrix, presets, SHI gauge, fertilizer advisory
    ├── SoilReportPage.jsx             # Soil Health Card OCR upload, verification table
    └── CropHistoryPage.jsx            # Authenticated user audit timeline of scans & reports
```

### Sub-Module Functionality

#### 1. `DiseaseDetectionPage.jsx`
- **Visual Leaf Scanning**: Allows uploading leaf photos or selecting calibrated sample crops (Tomato Early Blight, Potato Late Blight, Wheat Rust, Apple Scab, Corn Blight).
- **Leaf Quality Rejection Notice**: Honest visual indicator alerting farmers when uploaded images lack identifiable leaf foliage or suffer from severe underexposure/blur.
- **Pathology Output**: Displays diagnosed disease, pathogen family (*Alternaria solani*, *Puccinia triticina*), severity rating, and confidence score.
- **Dual Treatment Protocols**:
  - *Chemical Control*: Verified ICAR active ingredients (*Mancozeb 75% WP*, *Propiconazole 25% EC*, *Copper Oxychloride 50% WP*) with precise dosage per liter of water.
  - *Organic & Biological Control*: *Trichoderma viride*, *Pseudomonas fluorescens*, neem oil foliar spray, and crop rotation practices.
- **Interactive Symptom Questionnaire**: Modal fallback for farmers without camera access to identify diseases by checking observable foliage symptoms (brown lesions, yellow halos, leaf curling).
- **Cross-Domain Store Linkage**: Directly directs farmers to buy matching fungicides on AG Store (`/store-rental/products?q=Mancozeb`).

#### 2. `CropRecommendationPage.jsx`
- **Agro-Climatic Presets**: Quick-select presets for Indian soil zones (Alluvial Loam, Black Regur, Red Laterite, Sandy Arid).
- **Assay Inputs**: Allows fine-tuning Nitrogen (N), Phosphorus (P), Potassium (K), Soil pH, Annual Rainfall, Temperature, and Humidity.
- **Deterministic Evaluation**: Calls `/api/v1/crop-intelligence/recommend/` to retrieve the prime crop recommendation and alternative secondary crops.
- **Soil Health Assessment**: Computes Soil Health Index (0-100) and displays nutrient status badges (Low, Optimal, Medium, Alkaline, Acidic).
- **Fertilizer Balancing**: Generates specific dosage adjustments (e.g., urea split applications, single superphosphate basal doses, gypsum for alkalinity).
- **Mandi Connection**: Cross-links to AG Market Terminal (`/market-mandi/terminal?q=Rice`) and Market Copilot (`/market-mandi/copilot`).

#### 3. `SoilReportPage.jsx`
- **Document Intake**: Upload Soil Health Cards (PDF, JPG, PNG, WebP up to 10MB).
- **OCR Extraction**: Extracts Available Nitrogen, Phosphorus, Potassium, pH, Organic Carbon (OC), and Electrical Conductivity (EC).
- **Confidence Badges**: Displays parsing confidence per nutrient (High, Medium, Review Needed).
- **Farmer Verification**: Provides an editable spreadsheet table where the farmer can audit and correct any OCR misreads.
- **Matrix Transfer**: "Transfer to Crop Recommendation Matrix" button transfers confirmed soil metrics directly into the recommendation engine with zero re-typing.

#### 4. `CropHistoryPage.jsx`
- **Audit Timeline**: Displays past scans, soil reports, and recommendations linked to the authenticated farmer's account.
- **Tab Filtering**: Filter by "All Activity", "Leaf Scans", "Soil Reports", or "Recommendations".
- **Action Triggers**: Quick "Re-examine in Clinic" or "Apply to Crop Matrix" buttons.

---

## 4. Backend Architecture & Django REST Endpoints

### Registered Endpoints (`/api/v1/crop-intelligence/`)

| Method | Endpoint | Description | Auth Requirement |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/crop-intelligence/disease-scan/` | Uploads foliage image, validates leaf, outputs ICAR treatment | Public / Authenticated |
| `POST` | `/api/v1/crop-intelligence/symptom-lookup/` | Deterministic clinical symptom matching fallback | Public / Authenticated |
| `POST` | `/api/v1/crop-intelligence/recommend/` | Evaluates NPK, pH, and climate to output crop matrix | Public / Authenticated |
| `POST` | `/api/v1/crop-intelligence/soil-report/` | Ingests PDF/Image Soil Health Card, performs OCR extraction | Public / Authenticated |
| `POST` | `/api/v1/crop-intelligence/soil-report/confirm/` | Farmer-verified parameter confirmation and persistence | Public / Authenticated |
| `GET` | `/api/v1/crop-intelligence/history/` | Returns past scans, soil records, and recommendations for farmer | Authenticated (`IsAuthenticated`) |

### Database Models (`backend/ai/models.py`)

#### `CropScan`
- `user`: ForeignKey to User (nullable for guest scans).
- `image_url`: Path or reference to uploaded image.
- `crop_name`: Diagnosed crop (e.g., "Tomato").
- `diagnosed_disease`: Pathological condition (e.g., "Early Blight").
- `pathogen_type`: Fungal / Bacterial / Viral / Pest.
- `severity`: Low / Moderate / High / Severe.
- `confidence`: Decimal (0.0000 to 1.0000).
- `treatment_plan`: JSONField containing chemical controls, organic remedies, preventive practices, and store category links.
- `diagnostic_source`: "image_scan" | "symptom_lookup".

#### `SoilReport`
- `user`: ForeignKey to User (nullable).
- `file_name`: Uploaded filename.
- `parsed_data`: JSONField containing extracted N, P, K, pH, OC, EC values.
- `confidence_data`: JSONField containing confidence scores per parameter.
- `is_verified_by_user`: Boolean flag indicating farmer confirmation.

#### `CropRecommendationRecord`
- `user`: ForeignKey to User.
- `nitrogen`, `phosphorus`, `potassium`, `temperature`, `humidity`, `ph`, `rainfall`: Numerical inputs.
- `recommended_crop`: Display name of prime crop.
- `confidence`: Agronomic compatibility percentage.
- `alternatives`: JSONField containing secondary alternative crops.
- `soil_analysis`: JSONField containing Soil Health Index and nutrient status.
- `agronomic_advisory`: JSONField containing sowing window, water plan, fertilizer balancing.
- `from_soil_report`: ForeignKey to `SoilReport` if generated from an SHC scan.

---

## 5. Verification & Test Suite Results

### 1. Backend Automated Pytest Suite
Ran: `cd backend; .\.venv\Scripts\python.exe -m pytest tests/`
```text
============================= test session starts =============================
platform win32 -- Python 3.12.6, pytest-8.3.4
rootdir: C:\Users\User\Desktop\MINI PROJECT\backend
configfile: pyproject.toml
collected 27 items

tests\test_api_endpoints.py ......                                       [ 22%]
tests\test_crop_intelligence.py ......                                   [ 44%]
tests\test_market_copilot.py ...............                             [100%]

============================== 27 passed in 3.00s ==============================
```
**Coverage includes:**
- Soil nutrient classification and Soil Health Index (SHI) computation.
- Deterministic symptom lookup for Early Blight, Late Blight, Yellow Rust.
- Crop recommendation rule-tree evaluation across varying precipitation thresholds.
- Leaf image rejection and low-confidence visual heuristic responses.
- Soil Health Card upload, regex extraction, and user verification confirmation.
- Authenticated user history isolation (preventing cross-user data leakage).

### 2. Frontend Production Build
Ran: `cd frontend; npm run build`
```text
> frontend@0.0.0 build
> vite build

vite v8.2.2 building client environment for production...
transforming...
✓ 1880 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   1.36 kB │ gzip:   0.76 kB
dist/assets/index-CAbNhtZE.css  105.46 kB │ gzip:  16.04 kB
dist/assets/index-C4Y0UJAU.js   658.90 kB │ gzip: 168.66 kB

✓ built in 1.49s
```
Zero TypeScript/JSX syntax errors. All dynamic imports and components compiled cleanly.

---

## 6. Route Configuration & Module Boundaries

The target router (`frontend/src/router/AppRouter.jsx`) enforces clean boundaries:

```jsx
// AG CROP INTELLIGENCE MODULE (/crop-intelligence/*)
<Route path="/crop-intelligence" element={<Navigate to="/crop-intelligence/app" replace />} />
<Route path="/crop-intelligence/login" element={<LoginPage />} />
<Route path="/crop-intelligence/register" element={<LoginPage />} />
<Route path="/crop-intelligence/app" element={<CropIntelligenceApp />} />
<Route path="/crop-intelligence/clinic" element={<CropIntelligenceApp />} />
<Route path="/crop-intelligence/recommendation" element={<CropIntelligenceApp />} />
<Route path="/crop-intelligence/ocr" element={<CropIntelligenceApp />} />
<Route path="/crop-intelligence/history" element={<CropIntelligenceApp />} />

// Cross-domain redirects (Store & Market paths requested under /crop-intelligence)
<Route path="/crop-intelligence/store" element={<Navigate to="/store-rental/store" replace />} />
<Route path="/crop-intelligence/products" element={<Navigate to="/store-rental/products" replace />} />
<Route path="/crop-intelligence/cart" element={<Navigate to="/store-rental/cart" replace />} />
<Route path="/crop-intelligence/terminal" element={<Navigate to="/market-mandi/terminal" replace />} />
<Route path="/crop-intelligence/commodities" element={<Navigate to="/market-mandi/commodities" replace />} />
<Route path="/crop-intelligence/apmc" element={<Navigate to="/market-mandi/apmc" replace />} />
<Route path="/crop-intelligence/copilot" element={<Navigate to="/market-mandi/copilot" replace />} />
<Route path="/crop-intelligence/*" element={<CropIntelligenceApp />} />
```

---

## 7. Operational Runbook

### To start the backend:
```powershell
cd "C:\Users\User\Desktop\MINI PROJECT\backend"
.\.venv\Scripts\python.exe manage.py runserver 8000
```

### To start the frontend:
```powershell
cd "C:\Users\User\Desktop\MINI PROJECT\frontend"
npm run dev
```

### Direct Access URLs:
- **Central Landing Portal**: `http://localhost:5173/`
- **AG Store**: `http://localhost:5173/store-rental/app`
- **AG Market**: `http://localhost:5173/market-mandi/app`
- **AG Market Copilot**: `http://localhost:5173/market-mandi/copilot`
- **AG Crop (Clinic)**: `http://localhost:5173/crop-intelligence/clinic`
- **AG Crop (Soil Matrix)**: `http://localhost:5173/crop-intelligence/recommendation`
- **AG Crop (Soil Card OCR)**: `http://localhost:5173/crop-intelligence/ocr`
- **AG Crop (History)**: `http://localhost:5173/crop-intelligence/history`

