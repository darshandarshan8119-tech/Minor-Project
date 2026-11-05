# AG Crop Intelligence Migration Audit

**Date:** 2026-11-05  
**Engagement Principal:** Maik  
**Lead Systems Engineer:** Byte  
**Target Repository:** `C:\Users\User\Desktop\MINI PROJECT\`  
**Source Repository (Read-Only):** `C:\Users\User\Desktop\VIBEATHON 2026\AgriMart-Market-Intelligence\`  
**Scope:** Phase Zero Architectural & Schema Audit for AG Crop Submodule Activation  

---

## 1. Source Inventory (`VIBEATHON 2026`)

| File Path | Description | Evaluation / Reusability |
| :--- | :--- | :--- |
| `frontend/src/pages/DiseaseDetectionPage.jsx` | Standalone Leaf Disease Scanner UI. Two-column diagnostic terminal, preset specimen tester, drag-and-drop file upload, camera trigger, chemical vs. organic treatments, store product link. | **High Reusability (UI only).** Replace mock `setTimeout` and substring file name matching with actual backend API calls. |
| `frontend/src/pages/CropRecommendationPage.jsx` | Standalone Soil Chemistry & Crop Recommendation UI. Regional soil presets, dual sliders for N, P, K, pH, rainfall, temperature, ranked recommendation cards, agronomic explanations. | **High Reusability (UI only).** Replace client-side heuristic if/else threshold logic with backend API calls. |
| `frontend/src/data/diseaseData.js` | Pathology dataset containing 5 certified specimen profiles: `tomato_early_blight`, `corn_rust`, `healthy_rice`, `cotton_leaf_curl`, `potato_late_blight`. | **Reusable Reference.** Use as client-side test fixtures and fallback data for specimen demonstrations. |
| `frontend/src/data/cropRecommendationData.js` | 4 Soil presets (*Alluvial Loam*, *Black Regur*, *Red Laterite*, *Sandy Arid*) and client-side 3-tier recommendation algorithm. | **Reusable Reference.** Presets are agronomically sound; calculation logic will be superseded by the backend engine. |
| `frontend/src/assistant/cards/DiseaseScanCard.jsx` | Generative UI card for leaf diagnosis rendering inside chat bubbles. | **Reusable.** Already present in target assistant cards. |
| `frontend/src/assistant/cards/CropRecommendationCard.jsx` | Generative UI card for crop suitability rendering inside chat bubbles. | **Reusable.** Already present in target assistant cards. |

---

## 2. Target Inventory (`MINI PROJECT`)

| Component / File Path | Current Status | Findings & Required Action |
| :--- | :--- | :--- |
| `backend/ai/models.py` | Implemented | Defines `SoilReport`, `CropRecommendationRecord`, and updated `CropScan`. Relational schemas are solid. Foreign keys link to `CustomUser`. |
| `backend/ai/urls.py` | Incomplete | References `views.CropRecommendationView`, `views.ParseSoilReportView`, `views.DiseaseDetectionView`, etc. However, `views.py` is missing on disk. |
| `backend/ai/ml/MODEL_SELECTION.md` | Audited | Records strict rules: no fake AI, no synthetic models claimed as production, and marks `crop_recommender/train.py` (synthetic centroids) as quarantined. |
| `backend/ai/ml/crop_recommender/agronomic_rules.py` | Production-Grade | Computes Soil Health Index (0-100), nutrient statuses (Low, Med, Optimal, Excess), fertilizer adjustments, and APMC crop symbols. **Ready for immediate use.** |
| `backend/ai/ml/crop_recommender/train.py` | Quarantined | Synthetic centroid generator. Must remain quarantined until authentic Kaggle 2,200-sample dataset is verified. |
| `backend/ai/ml/crop_recommender/predict.py` | Prototype | Loads `model.joblib`. Can serve as model loader once real weights are trained. |
| `backend/ai/ml/disease_detector/classifier.py` | Heuristic Only | Uses RGB color masks. Not an actual deep-learning vision model. Must be gated behind leaf screening / honesty check. |
| `backend/ai/ml/disease_detector/taxonomy.py` | Production-Grade | Verified ICAR/CIB active ingredients, dosage rates, pre-harvest withholding days, commercial brand names (*Mancozeb*, *Propiconazole*, *Tilt*, *Kavach*), and store linkages. |
| `backend/ai/ml/disease_detector/fallback_engine.py` | Production-Grade | Jaccard similarity matcher for clinical symptom lookup. Honest fallback when images are unclear. |
| `backend/ai/ml/ocr/report_parser.py` | Prototype | Regex parameter extractor for Soil Health Cards (N, P, K, pH, OC, EC, and reference numbers). |
| `backend/realtime/main.py` | Quarantined Stub | `/api/v1/ai/crop-doctor/scan` returns hardcoded `confidence=0.51`. Must not be used for production. |
| `frontend/src/pages/CropPlaceholder.jsx` | Stub | Placeholder screen for Crop Intelligence. Needs replacement with `CropIntelligenceApp.jsx`. |
| `frontend/src/router/AppRouter.jsx` | Incomplete Routes | Routes `/crop-intelligence/*` to `CropPlaceholder.jsx`. |

---

## 3. Database Schema Mapping & Migration Status

- Current applied migrations: `ai.0001_initial` and `ai.0002_initial`.
- Database table `ai_cropscan` exists with 0 rows, containing legacy columns (`image_object_key`, `model_name`, `model_version`, `prediction_json`, `confidence`).
- Target models `SoilReport` and `CropRecommendationRecord` do not have tables created yet.
- **Migration Plan:** Create migration `ai.0003_crop_intelligence_expansion` to:
  1. Create table `ai_soilreport`.
  2. Create table `ai_croprecommendationrecord`.
  3. Alter table `ai_cropscan` to match current `models.py` (`image_url`, `crop_name`, `diagnosed_disease`, `pathogen_type`, `severity`, `treatment_plan`, `diagnostic_source`).
- Because `ai_cropscan` has 0 rows, migration execution is 100% risk-free.

---

## 4. Cross-Module Domain Bridges

### 4.1 AG Store Bridge (`/store-rental/products`)
- In `backend/ai/ml/disease_detector/taxonomy.py`:
  - `tomato_early_blight` -> Active: `Mancozeb` -> Search: `Mancozeb 75% WP Contact Fungicide`
  - `rice_brown_spot` -> Active: `Propiconazole` -> Search: `Propiconazole 25% EC`
  - `wheat_yellow_rust` -> Active: `Propiconazole` -> Search: `Propiconazole 25% EC`
- Target Store API supports query filtering: `GET /api/v1/store/products/?q=<active_ingredient>`.
- Frontend link format: `/store-rental/products?q=Mancozeb`.

### 4.2 AG Market Bridge (`/market-mandi/terminal`)
- In `backend/ai/ml/crop_recommender/agronomic_rules.py`:
  - `rice` -> Symbol: `PADDY` -> Commodity Code: `PAD-BASM` (Karnal / Ludhiana APMC)
  - `cotton` -> Symbol: `COTTON` -> Commodity Code: `COTTON-S6` (Rajkot APMC)
  - `maize` -> Symbol: `MAIZE` -> Commodity Code: `MAIZE-YEL`
- Target Market API supports live tickers: `GET /api/v1/mandi/tickers/`.
- Frontend link format: `/market-mandi/terminal`.

---

## 5. Architectural Honesty & Safety Guidelines

1. **Zero Fake Machine Learning:**
   - Rule-based agronomic recommendations will be explicitly tagged as `Engine: Deterministic Agronomic Rules (ICAR Calibrated)`.
   - Symptom lookups will be tagged as `Engine: Clinical Taxonomy Symptom Matcher`.
   - Image analysis will execute an upfront leaf-screening test. If image quality or leaf features are below threshold, return honest rejection rather than guessing.
   - If an ML vision model is offline or uncalibrated, return `model_status: "model_in_validation"` with an honest disclaimer.
2. **Soil Health Card Workflow Integrity:**
   - Extracted OCR values (N, P, K, pH) will be returned to the farmer for interactive review and correction.
   - The user must explicitly confirm the values before persisting as a verified `SoilReport`.
3. **Application Boundary Preservation:**
   - AG Crop will be mounted in its own standalone layout (`CropIntelligenceApp.jsx` + `CropNavbar.jsx`).
   - The floating AG Market Copilot launcher will remain strictly hidden within AG Crop.
   - Store and Market routes remain untouched.

---

## 6. Implementation Order

1. **Stage B:** Scaffold AG Crop frontend components and routes:
   - Create `CropIntelligenceApp.jsx` master shell.
   - Port and adapt `DiseaseDetectionPage.jsx` and `CropRecommendationPage.jsx`.
   - Create `SoilReportPage.jsx` and `CropHistoryPage.jsx`.
   - Update `AppRouter.jsx`.
2. **Stage C:** Backend Activation:
   - Generate and apply Django migration `0003` for `ai` models.
   - Implement `backend/ai/serializers.py`.
   - Implement `backend/ai/views.py`.
   - Wire URLs in `backend/agrimart/urls.py` under `api/v1/crop-intelligence/`.
3. **Stage D:** Real Agronomic Services & API Client:
   - Implement frontend API client methods in `frontend/src/services/api.js`.
   - Connect UI forms to live backend endpoints.
4. **Stage E:** Verification, Testing & Reports:
   - Pytest unit and integration test suite.
   - Frontend Vite build verification.
   - Deliver `CROP_INTELLIGENCE_INTEGRATION_REPORT.md`.

