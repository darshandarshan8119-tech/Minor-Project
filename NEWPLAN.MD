# AGRIMART — CROP INTELLIGENCE MODULE

## Master Implementation & Research Prompt

You are working as a senior full-stack + ML engineer on the existing **AgriMart** project.

Your task is to design, implement, test, integrate, and polish a new major module called:

# CROP INTELLIGENCE

The module has TWO independent capabilities:

1. **Crop Recommendation**

   * "What crop should I grow based on soil/environmental conditions?"

2. **Crop Disease Doctor**

   * "What disease may be affecting my crop, and what should I do?"

This module must integrate into the existing AgriMart system WITHOUT breaking any existing functionality, especially the existing **AgriStock Mandi / commodity trading module**.

---

# 0. ABSOLUTE RULES

These rules override convenience.

## RULE 1 — INSPECT BEFORE MODIFYING

Before writing code:

* Inspect the entire repository structure.
* Identify frontend framework.
* Identify backend framework.
* Identify database.
* Identify existing API structure.
* Identify authentication.
* Identify existing routing.
* Identify existing AgriStock/Mandi components.
* Identify shared components/utilities.
* Identify environment variables.
* Identify ML/model infrastructure if any already exists.
* Identify how the application is currently started.
* Identify build/test/lint commands.

Do NOT assume the technology stack.

Do NOT replace the existing architecture simply because you prefer another stack.

---

# 1. PROTECT THE EXISTING SYSTEM

The existing AgriStock functionality is already part of the project.

DO NOT:

* Rewrite AgriStock.
* Replace existing APIs unnecessarily.
* Change existing database tables unnecessarily.
* Delete existing components.
* Rename existing routes without a migration plan.
* Replace the existing frontend architecture.
* Change authentication behavior.
* Change existing trading/order-book logic.
* Break existing navigation.
* Remove existing mock data unless required.

Before implementation, create a dependency map showing:

```text
Existing AgriMart
       │
       ├── AgriStock
       │
       ├── Existing modules
       │
       └── Shared infrastructure

New Module
       │
       └── Crop Intelligence
```

The new module should be as isolated as reasonably possible.

---

# 2. FIRST PHASE — RESEARCH

Before implementation, research the actual technical and agricultural basis of the system.

Do NOT invent sources.

Use authoritative or peer-reviewed sources wherever possible.

Prioritize:

* Government of India
* ICAR
* Soil Health Card / Department of Agriculture
* FAO
* e-NAM
* peer-reviewed ML research
* PlantVillage research
* PlantDoc or other field-image datasets
* official agricultural disease-management sources

Research these areas:

### Crop Recommendation

Investigate:

* Soil parameters used for crop suitability.
* NPK.
* pH.
* Organic carbon.
* Electrical conductivity where appropriate.
* Temperature.
* Humidity.
* Rainfall.
* Soil moisture where available.
* Location.
* Season.
* Existing crop recommendation research.
* Suitable ML algorithms.
* Dataset limitations.

### Disease Detection

Investigate:

* PlantVillage.
* PlantDoc or similar real-world datasets.
* CNN-based disease classification.
* Transfer learning.
* MobileNet/EfficientNet/ResNet.
* Real-field image limitations.
* Image quality problems.
* Disease classes that can realistically be supported.
* Evidence-based disease management information.

Do NOT copy unsupported claims into the application.

Create a short internal research document:

```text
research/
    crop_recommendation.md
    disease_detection.md
    sources.md
    limitations.md
```

Every major technical/agricultural claim should have a source.

---

# 3. DEFINE A CONTROLLED MVP

Do NOT attempt to support every Indian crop and every plant disease.

This is a student/minor-project system.

Start with a controlled scope.

Before coding, determine:

### Crop Recommendation

Target approximately:

**10–15 crops**

based on dataset availability.

### Disease Detection

Target approximately:

**3–5 crops**

and only disease classes that the selected dataset/model actually supports.

The exact classes must be determined from the dataset, not invented.

Document:

```text
Supported crops:
...

Supported diseases:
...

Unsupported crops:
...

Unsupported diseases:
...
```

The UI must not claim universal diagnosis.

---

# 4. MODULE ARCHITECTURE

Build the following:

```text
                    CROP INTELLIGENCE
                           │
              ┌────────────┴────────────┐
              │                         │
        CROP ADVISOR               CROP DOCTOR
              │                         │
       ┌──────┴──────┐           ┌──────┴──────┐
       │             │           │             │
 Soil Report     Manual Input   Image       Manual Disease
       │             │           │             │
       └──────┬──────┘           └──────┬──────┘
              │                         │
              ▼                         ▼
        Crop ML Model            Disease ML Model
              │                         │
              ▼                         ▼
      Crop Recommendations      Disease Prediction
              │                         │
              │                         ▼
              │                  Agricultural
              │                  Knowledge Base
              │                         │
              ▼                         ▼
        Explanation              Care / Management
```

---

# 5. CROP ADVISOR — USER FLOW

Create a dedicated Crop Advisor page.

The user should see TWO options:

## Option A

### Upload Soil Test Report

Supported formats:

* PDF
* JPG
* PNG

Flow:

```text
Upload
 ↓
Extract values
 ↓
Validate
 ↓
Show extracted values
 ↓
User confirms/corrects values
 ↓
ML prediction
 ↓
Recommendations
```

IMPORTANT:

Do not silently trust extracted values.

Display:

```text
Detected:

Nitrogen: 82
Phosphorus: 42
Potassium: 55
pH: 6.8

[Confirm]
[Edit]
```

This gives the farmer control over OCR/extraction errors.

---

# 6. SOIL REPORT EXTRACTION

Do NOT feed an arbitrary PDF directly into the ML model.

Build:

```text
PDF/Image
   ↓
Document extraction
   ↓
Structured fields
   ↓
Unit normalization
   ↓
Validation
   ↓
ML model
```

Expected structured representation:

```json
{
  "nitrogen": 82,
  "phosphorus": 42,
  "potassium": 55,
  "ph": 6.8,
  "organic_carbon": 0.72,
  "ec": 0.41
}
```

Only use features actually supported by the trained model.

If a field cannot be confidently extracted:

```text
"Unable to reliably extract pH."
```

Do NOT hallucinate a value.

---

# 7. MANUAL CROP RECOMMENDATION

If the farmer does not have a soil report:

Provide a manual form.

Possible inputs:

* Nitrogen
* Phosphorus
* Potassium
* pH
* Temperature
* Humidity
* Rainfall
* Soil type
* Location
* Season

Only expose fields actually used by the model.

If the user doesn't know a value:

Do NOT invent it.

Clearly indicate:

```text
Not provided
```

and either:

* use a model specifically designed for missing values, OR
* explain that additional information is required.

---

# 8. CROP ML PIPELINE

Build a proper reproducible ML pipeline:

```text
Dataset
 ↓
Data inspection
 ↓
Cleaning
 ↓
Duplicate check
 ↓
Missing-value handling
 ↓
Outlier analysis
 ↓
Feature analysis
 ↓
Train/validation/test split
 ↓
Model training
 ↓
Cross-validation where appropriate
 ↓
Evaluation
 ↓
Model selection
 ↓
Save model
 ↓
Version model
```

Start with:

* Decision Tree
* Random Forest

Optionally compare:

* XGBoost / Gradient Boosting

Do not choose a model simply because it has the highest training accuracy.

Evaluate on held-out data.

Record:

* Accuracy
* Precision
* Recall
* F1-score
* Confusion matrix

Save:

```text
model/
    crop_recommender.joblib
    metadata.json
```

Metadata should contain:

```json
{
  "model_version": "...",
  "features": [...],
  "classes": [...],
  "training_dataset": "...",
  "evaluation_metrics": {...}
}
```

---

# 9. CROP RECOMMENDATION OUTPUT

Do NOT return only:

```text
Rice
```

Return the top recommendations.

Example:

```text
Recommended Crops

1. Rice
   Suitability Score: 0.91

2. Maize
   Suitability Score: 0.84

3. Groundnut
   Suitability Score: 0.72
```

IMPORTANT:

Do not call a raw classifier score a guaranteed probability.

Use wording such as:

> Model suitability score

unless the model has been properly calibrated and validated as a probability.

---

# 10. EXPLANATION OF CROP RECOMMENDATION

For each result, explain which input factors influenced the recommendation.

Example:

```text
Why this crop was recommended:

✓ pH is within the model's learned range
✓ Temperature is compatible with the training data
✓ Rainfall conditions are compatible
✓ N/P/K values are within the learned pattern
```

Do NOT generate fabricated scientific explanations.

If the model cannot explain a factor reliably, say:

> "The model prediction is based on the combined input features."

For a Random Forest, consider using feature importance or SHAP only if implemented correctly.

---

# 11. IMPORTANT LIMITATION

The system must clearly communicate:

> This is a crop suitability recommendation, not a guarantee of yield or crop success.

The model cannot know everything about a farm.

Real-world factors include:

* irrigation
* pests
* weather changes
* seed quality
* farming practices
* local microclimate
* disease
* market conditions

Do not overclaim.

---

# 12. CROP DOCTOR — USER FLOW

Create a separate page:

# Crop Doctor

Provide TWO modes.

## Mode A — Image Diagnosis

```text
Select Crop
      ↓
Upload Plant Image
      ↓
Image Quality Check
      ↓
Disease Model
      ↓
Prediction
      ↓
Confidence / uncertainty
      ↓
Management Guidance
```

---

# 13. IMAGE QUALITY CHECK

Before disease classification:

Check whether the image is usable.

Possible checks:

* File type
* Resolution
* Blur
* Extreme darkness
* Extreme brightness
* Image dimensions

If unusable:

```text
The image is too unclear for reliable analysis.
Please upload a clearer image showing the affected part of the plant.
```

Do not force a prediction from a bad image.

---

# 14. DISEASE ML MODEL

Use transfer learning rather than training a deep CNN from scratch unless there is a strong reason.

Evaluate candidate architectures such as:

* MobileNetV3
* EfficientNet
* ResNet

Choose based on:

* validation performance
* inference cost
* model size
* suitability for deployment

Build:

```text
Dataset
 ↓
Train / validation / test
 ↓
Image preprocessing
 ↓
Augmentation
 ↓
Transfer learning
 ↓
Fine-tuning
 ↓
Evaluation
 ↓
Save model
```

Record:

* Accuracy
* Precision
* Recall
* F1
* Confusion matrix
* Per-class performance

Do not report only accuracy.

---

# 15. DATASET LIMITATION

If using PlantVillage:

Document that controlled laboratory-style images can differ substantially from real field images.

Therefore:

```text
PlantVillage performance
        ≠
Guaranteed real-farm performance
```

If possible, test on a small real-world dataset such as PlantDoc or another appropriately licensed field dataset.

If such data is unavailable, explicitly document this limitation.

Never hide it.

---

# 16. DISEASE OUTPUT

Example:

```text
Crop:
Tomato

Possible Disease:
Early Blight

Model Confidence:
87%

Image Assessment:
Suitable for analysis
```

Then:

```text
What to look for:

• ...
• ...
• ...
```

But don't claim:

> "This plant definitely has the disease."

Use:

> "The model predicts..."

---

# 17. UNKNOWN / LOW-CONFIDENCE CLASS

This is REQUIRED.

If the model is uncertain:

```text
The model could not confidently identify a supported disease.

Try:
• Uploading a clearer image
• Showing the affected leaf more closely
• Selecting the crop manually
• Consulting an agricultural expert
```

Do not force every image into one of the disease classes.

If implementing a confidence threshold, document how it was selected using validation data rather than choosing an arbitrary number without justification.

---

# 18. MANUAL DISEASE MODE

If the farmer already knows the disease:

```text
Select Crop
    ↓
Select / Enter Disease
    ↓
Get Guidance
```

Example:

```text
Crop:
Tomato

Disease:
Early Blight

[Get Management Guidance]
```

This mode does NOT use ML diagnosis.

It retrieves information from the agricultural knowledge base.

---

# 19. NEVER LET THE LLM INVENT PESTICIDES

This is a critical safety rule.

Architecture:

```text
Disease Prediction
       ↓
Structured Disease ID
       ↓
Verified Knowledge Base
       ↓
Management Information
```

NOT:

```text
Image
 ↓
LLM
 ↓
Random pesticide
```

If pesticide/fungicide information is included, it must come from verified agricultural sources and applicable product/label information.

The LLM, if used, should primarily convert structured information into farmer-friendly language.

It must not invent:

* chemical names
* dosage
* concentration
* application interval
* legal approval
* crop safety claims

If no verified treatment information exists:

> "No verified treatment information is available in the current knowledge base."

---

# 20. KNOWLEDGE BASE

Create a structured disease guidance database.

Example:

```text
disease_guidance

id
crop
disease
symptoms
causes
prevention
management
treatment_reference
source
last_verified
```

Example conceptual record:

```json
{
  "crop": "tomato",
  "disease": "early_blight",
  "symptoms": [...],
  "prevention": [...],
  "management": [...],
  "source": "verified agricultural source"
}
```

The ML model identifies.

The knowledge base explains.

Keep these responsibilities separate.

---

# 21. API DESIGN

Follow the existing project's API conventions.

Potential endpoints:

```text
POST /crop-recommendation/report
POST /crop-recommendation/manual

POST /crop-disease/predict
POST /crop-disease/manual

GET /crop-disease/{crop}/{disease}
```

Do NOT blindly create these exact paths if the existing project uses another convention.

Inspect the backend first.

Every endpoint must have:

* Input validation
* Error handling
* File-size validation
* File-type validation
* Authentication where required
* Clear response schema
* Logging
* No sensitive data leakage

---

# 22. DATABASE

Use the existing database technology.

Do not introduce another database.

Possible entities:

### SoilReport

```text
id
user_id
file_path
extracted_data
created_at
```

### CropRecommendation

```text
id
user_id
soil_report_id
input_features
recommendations
model_version
created_at
```

### DiseasePrediction

```text
id
user_id
image_path
crop
prediction
confidence
model_version
created_at
```

### DiseaseGuidance

```text
id
crop
disease
guidance
source
last_verified
```

Adapt these to the existing schema.

---

# 23. FILE STORAGE

Do not permanently dump uploaded PDFs/images into random directories.

Inspect existing storage architecture.

If none exists, implement a clean storage abstraction.

Validate:

* MIME type
* Extension
* File size
* Image dimensions

Generate safe filenames.

Never trust the uploaded filename.

---

# 24. FRONTEND DESIGN

Match the existing AgriMart design system.

The module should feel like part of the same product.

Use:

* clean light interface
* warm off-white background
* white cards
* charcoal text
* forest-green accents
* warm amber for warnings
* readable typography
* clear hierarchy
* minimal animation

Do NOT create a completely different visual language.

---

# 25. CROP ADVISOR UI

Suggested structure:

```text
CROP ADVISOR

What do you want to use?

┌─────────────────────────┐
│ Upload Soil Report      │
│ PDF / JPG / PNG         │
└─────────────────────────┘

          OR

┌─────────────────────────┐
│ Enter Conditions        │
│ Manually                │
└─────────────────────────┘
```

After processing:

```text
SOIL INFORMATION

N       82
P       42
K       55
pH      6.8
...
```

Then:

```text
RECOMMENDED CROPS

🌾 Rice
High suitability

🌽 Maize
High suitability

🥜 Groundnut
Moderate suitability
```

---

# 26. CROP DOCTOR UI

Suggested structure:

```text
CROP DOCTOR

[ Diagnose from Image ]

[ I Already Know the Disease ]
```

Image mode:

```text
Select Crop
      ↓
Upload Image
      ↓
Analyze
```

Result:

```text
PREDICTION

Tomato — Early Blight

Model confidence: XX%

[ View Symptoms ]
[ Prevention ]
[ Management ]
```

Manual mode:

```text
Crop: Tomato
Disease: Early Blight

[ Get Guidance ]
```

---

# 27. INTEGRATION WITH AGRISTOCK

Do NOT tightly couple Crop Intelligence to AgriStock.

Keep the modules independent.

However, provide a logical navigation connection:

```text
Crop Intelligence
      ↓
Farmer grows crop
      ↓
Crop Doctor
      ↓
Harvest
      ↓
AgriStock
      ↓
Sell commodity
```

Optional future connection:

```text
Recommended Crop
      ↓
Input Store
      ↓
Seeds / Fertilizer / Machinery
```

Do not build unnecessary integrations unless they are already supported by the existing architecture.

---

# 28. MODEL SERVING

The backend should load trained models efficiently.

DO NOT load the model from disk on every API request.

Use application startup/lifecycle loading:

```text
Application starts
       ↓
Load model
       ↓
Keep model in memory
       ↓
API requests use loaded model
```

If model size becomes a problem, design a separate inference service only if justified.

For the minor project, keep deployment simple.

---

# 29. ERROR HANDLING

Every stage needs graceful failure.

Examples:

### Bad soil report

```text
Could not reliably extract the required soil parameters.
Please review the detected values manually.
```

### Missing features

```text
Insufficient information for recommendation.
Please provide pH and N/P/K values.
```

### Bad image

```text
Image quality is insufficient for analysis.
```

### Unsupported crop

```text
This crop is not currently supported by the disease model.
```

### Unknown disease

```text
No supported disease could be confidently identified.
```

### ML model unavailable

```text
Crop analysis is temporarily unavailable.
Please try again later.
```

Never expose stack traces to users.

---

# 30. TESTING

Do not stop when the page looks good.

Test the actual system.

## Backend tests

Test:

* valid input
* missing input
* invalid numbers
* negative NPK
* impossible pH
* oversized file
* invalid file type
* corrupted PDF
* corrupted image
* unsupported crop
* model failure

## ML tests

Test:

* normal samples
* edge cases
* class imbalance
* unseen/poor images
* low-confidence cases

## Frontend tests

Test:

* upload
* loading state
* error state
* results
* retry
* mobile layout
* desktop layout

---

# 31. REGRESSION TEST EXISTING AGRISTOCK

This is mandatory.

Before declaring the module complete, verify:

```text
AgriStock opens
Commodity pages work
Order book works
Market depth works
Buy flow works
Sell flow works
Quantity selection works
Cost calculation works
Escrow UI works
Contract note works
Transaction history works
Existing navigation works
Authentication works
```

If anything breaks, fix it before finalizing.

---

# 32. AUTOMATED QUALITY LOOP

Work iteratively.

After every meaningful implementation stage:

```text
IMPLEMENT
   ↓
RUN
   ↓
TEST
   ↓
CHECK ERRORS
   ↓
FIX
   ↓
RUN AGAIN
   ↓
REGRESSION TEST
```

Do NOT assume success because code was generated.

---

# 33. DO NOT STOP AT FIRST SUCCESS

Continue the implementation/test/fix loop until:

* Build succeeds.
* Backend starts.
* Frontend starts.
* Database migrations work.
* APIs respond correctly.
* ML models load.
* Crop recommendation works.
* Disease prediction works.
* Manual disease mode works.
* Upload validation works.
* Low-confidence handling works.
* Existing AgriStock works.
* No major console errors exist.
* No broken routes exist.
* No obvious UI defects remain.

If a test fails:

1. Identify the root cause.
2. Fix the root cause.
3. Re-run the failing test.
4. Re-run relevant regression tests.

Do not hide or suppress errors just to make tests pass.

---

# 34. ANTI-HALLUCINATION RULES

This project must prioritize factual correctness.

NEVER invent:

* datasets
* papers
* government programs
* agricultural recommendations
* pesticide approvals
* chemical dosage
* ML accuracy
* model performance
* API capabilities
* banking integrations
* legal status
* certifications

If something is unknown:

```text
UNKNOWN
```

or:

```text
NOT VERIFIED
```

is better than fabrication.

Do not create fake citations.

Do not create fake research results.

Do not claim an external integration exists unless it actually exists.

---

# 35. IMPORTANT DISTINCTION

Always distinguish:

### Implemented

Actually working in this repository.

### Simulated

UI/workflow demonstrating how a future integration would work.

### Proposed

Architecture planned for future implementation.

### External

Requires a third-party service/API/organization.

Use these labels where necessary.

For example:

```text
Axis Escrow:
Prototype / Simulated

Government data:
Reference / External

ML prediction:
Implemented

Disease guidance:
Knowledge-base driven
```

---

# 36. MODEL PERFORMANCE REPORT

Create:

```text
ml/
    crop_recommendation/
        dataset_info.md
        train.py
        evaluate.py
        model/
        metrics/

    disease_detection/
        dataset_info.md
        train.py
        evaluate.py
        model/
        metrics/
```

Generate an evaluation report containing:

```text
Dataset
Number of samples
Classes
Features
Train/test split
Model architecture
Metrics
Confusion matrix
Known limitations
```

Never invent metrics.

Run the evaluation and use the actual output.

---

# 37. SECURITY

For uploads:

* Limit file size.
* Validate MIME types.
* Sanitize filenames.
* Prevent path traversal.
* Do not execute uploaded files.
* Store uploads safely.
* Do not expose server filesystem paths.

For APIs:

* Validate request bodies.
* Validate numeric ranges.
* Handle unauthorized requests.
* Avoid leaking model internals unnecessarily.

---

# 38. DOCUMENTATION

Create/update:

```text
docs/
    crop-intelligence-architecture.md
    crop-recommendation.md
    disease-detection.md
    api.md
    datasets.md
    limitations.md
    testing.md
```

The documentation should explain:

1. Problem
2. Architecture
3. Data
4. ML models
5. Training
6. Evaluation
7. API
8. Frontend
9. Limitations
10. Future improvements

---

# 39. FINAL PROJECT ARCHITECTURE

The completed system should conceptually look like:

```text
                         AGRIMART
                            │
       ┌────────────────────┼────────────────────┐
       │                    │                    │
       ▼                    ▼                    ▼
CROP INTELLIGENCE       INPUT STORE          AGRISTOCK
       │                                         │
 ┌─────┴─────┐                              ┌────┴────┐
 │           │                              │         │
Advisor    Doctor                         Buy       Sell
 │           │                              │         │
 │           │                              └────┬────┘
 │           │                                   │
 ▼           ▼                                   ▼
Crop       Disease                         Order Book
ML         CNN/Transfer                    Market Depth
 │           │                              Price Discovery
 ▼           ▼                                   │
Recommendation  Care                          Trade
                                               │
                                               ▼
                                        Quality / Weight
                                               │
                                               ▼
                                            Escrow
                                               │
                                               ▼
                                          Settlement
```

---

# 40. DEVELOPMENT ORDER

Follow this exact order unless repository constraints require a change:

## Phase 1

Inspect existing repository.

## Phase 2

Document architecture and integration points.

## Phase 3

Research datasets and agricultural sources.

## Phase 4

Lock supported crops/diseases.

## Phase 5

Build and evaluate crop recommendation model.

## Phase 6

Build and evaluate disease detection model.

## Phase 7

Create agricultural knowledge base.

## Phase 8

Create backend APIs.

## Phase 9

Implement soil-report extraction.

## Phase 10

Implement Crop Advisor frontend.

## Phase 11

Implement Crop Doctor frontend.

## Phase 12

Integrate authentication/database/storage.

## Phase 13

Run complete test suite.

## Phase 14

Run AgriStock regression tests.

## Phase 15

Fix all discovered issues.

## Phase 16

Polish UI/UX.

## Phase 17

Create documentation and final project report material.

---

# 41. FINAL ACCEPTANCE CRITERIA

Do not declare the task complete until all of these are true:

### Crop Advisor

[ ] Soil report upload works
[ ] Extracted values are displayed for confirmation
[ ] Manual input works
[ ] Input validation works
[ ] ML model loads correctly
[ ] Top recommendations are returned
[ ] Suitability scores are clearly labeled
[ ] Explanation is provided
[ ] Missing/invalid data is handled
[ ] Limitations are communicated

### Crop Doctor

[ ] Image upload works
[ ] Crop selection works
[ ] Image validation works
[ ] Disease model loads
[ ] Supported disease prediction works
[ ] Confidence/uncertainty is shown appropriately
[ ] Low-confidence result is handled
[ ] Manual disease mode works
[ ] Guidance comes from structured verified information
[ ] No fabricated pesticide/medical-style prescriptions
[ ] Unsupported crops are handled

### Existing AgriStock

[ ] AgriStock still works
[ ] Order book works
[ ] Market depth works
[ ] Buy/sell flow works
[ ] Cost calculations work
[ ] Escrow workflow remains intact
[ ] Contract notes remain intact
[ ] Navigation remains intact

### Engineering

[ ] No broken build
[ ] No critical console errors
[ ] No broken API endpoints
[ ] No database corruption
[ ] Upload security implemented
[ ] Tests pass
[ ] Documentation updated
[ ] No fake claims/citations/metrics

---

# 42. FINAL BEHAVIOR

Act as an autonomous senior engineer.

Do not continuously ask for permission for routine engineering decisions.

However, STOP and ask for clarification if you encounter a genuinely destructive architectural decision where guessing could damage the existing project.

For everything else:

**Inspect → Plan → Implement → Run → Test → Fix → Regression test → Improve.**

Do not give me a long explanation of what you intend to build before doing the work.

First inspect the repository and understand what already exists.

Then implement incrementally.

After implementation, report:

1. What was built.
2. Files/components added or changed.
3. ML models/datasets used.
4. Actual evaluation metrics.
5. APIs created.
6. Database changes.
7. Tests performed.
8. Existing AgriStock regression status.
9. Known limitations.
10. Anything that remains simulated/proposed rather than genuinely integrated.

Never claim success without actually testing the implementation.
