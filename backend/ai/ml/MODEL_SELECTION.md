# Crop Intelligence Model Selection Log

Status: research and validation phase only.
Last updated: 2026-09-18.

This document records the audit, candidate research, and local smoke tests for Crop Intelligence ML components. No model has been selected for production integration yet. No training should be started until the candidate comparison is complete and reviewed.

## Ground Rules

- Do not expose synthetic, heuristic, mock, or hardcoded predictions as real AI.
- Do not claim reported model-card accuracy as our achieved accuracy.
- Do not integrate an LLM as the source of crop suitability, disease diagnosis, pesticide names, dosage, or treatment schedule.
- Until a real model is selected and integrated, API behavior must be honest: `model_unavailable`, `low_confidence`, or similar.

## Audit Of Existing AI/ML Code

### Files That Must Be Quarantined Or Reworked

| File | Issue | Used by current registered routes? | Action |
| --- | --- | --- | --- |
| `backend/ai/ml/crop_recommender/train.py` | Generates synthetic data from manually defined crop centroids and trains RandomForest. Contains fabricated dataset name `synthetic-agronomic-centroid-v1` and accuracy calculation on generated data. | Not currently exposed after removing premature `api/v1/ai/` registration. | Quarantine before API work. Keep only as reference for data-contract shape, not as ML implementation. |
| `backend/ai/ml/crop_recommender/predict.py` | Auto-trains if `model.joblib` does not exist and returns confidence/top alternatives from synthetic model. | Not currently exposed. | Quarantine. Must not be called by production endpoints. |
| `backend/ai/ml/disease_detector/classifier.py` | Uses color/leaf heuristics and maps to fixed disease keys; returns hardcoded confidence ranges. Not a trained image classifier. | Not currently exposed. | Quarantine. Replace with real pretrained/fine-tuned model loader or honest unavailable response. |
| `backend/ai/ml/disease_detector/fallback_engine.py` | Manual symptom matching is rule-based. This can be acceptable only as a clearly labeled knowledge-base lookup, not as image AI. It currently assigns confidence scores. | Not currently exposed. | Keep only if renamed/positioned as `knowledge_lookup`, with no claim of ML diagnosis. |
| `backend/ai/ml/disease_detector/taxonomy.py` | Hardcoded disease knowledge base. Useful as verified guidance if citations are added; not model output. | Not currently exposed. | Keep as knowledge-base seed, but add sources before production. |
| `backend/ai/ml/ocr/report_parser.py` | Regex prototype assigns fixed confidence values. OCR prototype is allowed by task, but confidence must be described as parser confidence, not OCR certainty. | Not currently exposed. | Keep as prototype only; add real OCR/PDF extraction in later phase. |
| `backend/realtime/main.py` | Existing FastAPI `/api/v1/ai/crop-doctor/scan` returns `healthy_or_unknown` and fixed `confidence=0.51`. | Yes, exposed by FastAPI service if running. | Must be disabled or changed to honest `model_unavailable` before any demo. |

### Structural Notes

- `backend/ai/models.py` has already been expanded toward the requested `SoilReport`, `CropRecommendationRecord`, and `CropScan` models. That is data modeling, not fake AI by itself.
- `backend/ai/urls.py` currently exists but imports `ai.views`, which has not been implemented. The Django project-level `api/v1/ai/` route has been removed for now to avoid exposing/breaking unfinished APIs.
- No `model.joblib` exists at this checkpoint.

## Local Environment Checks

Commands run from `backend/`:

```powershell
uv run python - <<metadata smoke test>>
```

Results:

- `joblib`: installed and importable.
- `sklearn`: installed and importable.
- `numpy`: installed and importable.
- `huggingface_hub`: not installed.
- `transformers`: not installed.
- `torch`: not installed.

Implication: tabular sklearn artifacts can be tested locally now. Hugging Face / PyTorch vision and LLM candidates can be metadata-tested and config-tested, but full model loading needs an explicit dependency/hardware decision.

## Crop Recommendation Candidates

Required input schema: nitrogen, phosphorus, potassium, temperature, humidity, pH, rainfall.

### Candidate CR-1: Kaggle Crop Recommendation Dataset + self-trained sklearn model

| Field | Finding |
| --- | --- |
| model/repository | Kaggle `Crop Recommendation` dataset. |
| model architecture | No pretrained model; dataset commonly used with RandomForest/SVM/KNN. |
| source | `https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset` and Kaggle search result for crop recommendation dataset. |
| license | Must be verified on Kaggle page before use. Kaggle page was not fully accessible through current tool output. |
| training dataset | 7-feature crop recommendation dataset with N, P, K, temperature, humidity, pH, rainfall. |
| dataset size | Commonly reported as 2,200 rows / 22 crop classes, but this must be verified from downloaded dataset, not assumed. |
| input features | Matches required 7 features. |
| output classes | Appears to match 22 crop classes required by task. Must verify exact labels after download. |
| preprocessing | Usually direct numeric features; scaling depends on model. |
| reported metrics | Many notebooks report high accuracy, but not independently verified. |
| model size | N/A until trained. |
| dependencies | scikit-learn, numpy, joblib/pandas if training. |
| local inference requirements | CPU feasible. |
| successfully tested locally | No. This is a dataset/training route, not an existing trained artifact. |
| limitations | Not an existing pretrained model. Dataset provenance/license must be verified. |
| final suitability | Suitable fallback path only if no legitimate pretrained artifact is found. Do not train yet. |

### Candidate CR-2: `agri-innovative` crop recommendation notebook artifact

| Field | Finding |
| --- | --- |
| model/repository | GitHub search found notebook writing `crop_recommendation.pkl`. |
| model architecture | Pickled sklearn model, likely RandomForest or similar. |
| source | Search result: `agri-innovative/notebooks/crop_recommendation.ipynb`. |
| license | Not verified. |
| training dataset | Appears to use N, P, K, temperature, humidity, pH, rainfall dataset. |
| dataset size | Not verified. |
| input features | Likely matches required 7 features. |
| output classes | Not verified. |
| preprocessing | Not verified. |
| reported metrics | Not verified. |
| model size | Not verified. |
| dependencies | Python pickle/sklearn. |
| local inference requirements | CPU feasible if artifact is valid. |
| successfully tested locally | No. Artifact URL/license not verified. |
| limitations | Notebook artifacts from random repos are high supply-chain risk; pickle is unsafe unless source is trusted. |
| final suitability | Not suitable yet. Needs license/source verification and safe artifact handling. |

### Candidate CR-3: `Pratik025/farmwisebackend` Hugging Face repository script

| Field | Finding |
| --- | --- |
| model/repository | Hugging Face search result references `scripts/train_crop_model.py`. |
| model architecture | RandomForestClassifier according to search snippet. |
| source | Search result: `Pratik025/farmwisebackend`. |
| license | Not verified. |
| training dataset | Appears to use same 7-feature crop recommendation task. |
| dataset size | Not verified. |
| input features | Likely matches required 7 features. |
| output classes | Not verified. |
| preprocessing | Not verified. |
| reported metrics | Not verified. |
| model size | N/A or not verified. |
| dependencies | scikit-learn/joblib. |
| local inference requirements | CPU feasible. |
| successfully tested locally | No. This is a training script candidate, not validated pretrained artifact. |
| limitations | Does not satisfy "existing trained model" unless a model artifact with license is found. |
| final suitability | Not selected. Keep as reference only. |

### Crop Recommendation Interim Conclusion

No legitimate, licensed, already-trained crop recommendation model has been selected yet. The most credible route may become using the Kaggle dataset and training our own sklearn model, but that is explicitly deferred until candidate search is exhausted and approved.

## Disease Detection Candidates

### Candidate DD-1: `linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification`

| Field | Finding |
| --- | --- |
| model/repository | `linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification` |
| model architecture | MobileNetV2 image classifier. |
| source | Hugging Face model page: `https://huggingface.co/linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification` |
| license | Hugging Face metadata says `other`. This is a blocker until clarified. |
| training dataset | Model card says Kaggle version of PlantVillage. |
| dataset size | Not stated on model card. |
| number of crop classes | PlantVillage crop coverage across 38 class labels, including healthy labels. |
| number of disease classes | 38 total labels including healthy/normal crop classes. Local config load confirmed 38 labels. |
| image resolution | Preprocessor config: resize shortest edge 256, center crop 224x224. |
| preprocessing/normalization | Rescale by 1/255, normalize mean `[0.5,0.5,0.5]`, std `[0.5,0.5,0.5]`. |
| PlantVillage or field images | PlantVillage/Kaggle version per model card. Not field images. |
| inference framework | Transformers + PyTorch. |
| reported metrics | Model card reports eval accuracy 0.9541 and cross-entropy 0.15. Not independently verified. |
| model size | Not available from metadata API response; file is `pytorch_model.bin`. |
| dependencies | transformers, torch, Pillow. |
| CPU feasibility | Likely feasible because MobileNetV2 is lightweight, but not benchmarked locally. |
| confidence/output format | Softmax labels through Transformers image-classification pipeline. |
| successfully tested locally | Partial only: metadata, config, label map, and preprocessor config were downloaded and parsed locally. Full weights were not loaded because torch/transformers are not installed and license is unclear. |
| limitations | License blocker; PlantVillage lab images do not guarantee field-image robustness; model card warns not replacement for expert diagnosis. |
| final suitability | Promising technical candidate, blocked by license clarification and full local inference test. |

Local smoke test result:

```text
id: linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification
pipeline: image-classification
license: other
tags include: transformers, pytorch, mobilenet_v2, image-classification
local config load: OK
local label count: 38
first labels: Apple Scab, Apple with Black Rot, Cedar Apple Rust, Healthy Apple
preprocessor: 224 crop, 256 resize, mean/std 0.5
```

### Candidate DD-2: MobileNetV3-small ONNX plant disease model from peer-reviewed paper

| Field | Finding |
| --- | --- |
| model/repository | Plant disease detection model for edge computing devices. |
| model architecture | MobileNetV3-small, ONNX format according to abstract/search result. |
| source | PubMed Central article: `https://pmc.ncbi.nlm.nih.gov/articles/PMC...` from search result. |
| license | Paper is accessible through PMC, but model artifact license/repository not yet found. |
| training dataset | Plant disease dataset, likely PlantVillage; exact artifact dataset must be verified from paper/repo. |
| dataset size | Not yet verified. |
| number of crop classes | Not yet verified. |
| number of disease classes | Not yet verified. |
| image resolution | Not yet verified. |
| preprocessing/normalization | Not yet verified. |
| PlantVillage or field images | Not yet verified. |
| inference framework | ONNX Runtime if artifact is available. |
| reported metrics | Search result reports around 99.50% test accuracy. Not independently verified. |
| model size | Not yet verified. |
| dependencies | onnxruntime, Pillow/numpy. |
| CPU feasibility | Potentially strong because MobileNetV3-small + ONNX is edge-oriented. |
| confidence/output format | Not yet verified. |
| successfully tested locally | No. Artifact URL not found yet. |
| limitations | Paper without accessible artifact is not enough for integration. |
| final suitability | Continue research. Potentially attractive if ONNX artifact and license are available. |

### Candidate DD-3: `google/mobilenet_v2_1.0_224`

| Field | Finding |
| --- | --- |
| model/repository | `google/mobilenet_v2_1.0_224` |
| model architecture | MobileNetV2 image classifier. |
| source | Hugging Face model metadata API. |
| license | Metadata says `other`. |
| training dataset | ImageNet-1k, not plant disease. |
| number of crop/disease classes | 0 disease classes; ImageNet labels only. |
| image resolution | 224x224. |
| inference framework | Transformers/PyTorch. |
| CPU feasibility | Likely feasible. |
| successfully tested locally | Metadata only. |
| limitations | Not a disease classifier. Would require fine-tuning. |
| final suitability | Not suitable as final model, only as base architecture if training/fine-tuning is later approved. |

## Agriculture LLM Candidates

### Candidate LLM-1: `bharatgenai/AgriParam`

| Field | Finding |
| --- | --- |
| model/repository | `bharatgenai/AgriParam` |
| source | Hugging Face: `https://huggingface.co/bharatgenai/AgriParam`; BharatGen site: `https://bharatgen.com/`. |
| license | Apache-2.0 per Hugging Face metadata. |
| model size | Hugging Face page lists 3B params, F32 tensor type. |
| architecture | ParamBharatGen / Param-1-2.9B-Instruct derived; hidden size 2048, 32 layers per model card. |
| supported languages | English and Hindi tags. |
| hardware requirements | Likely high for local CPU; model card examples use Transformers, vLLM, SGLang, Docker. |
| inference method | Transformers with custom remote code, vLLM, SGLang, Docker model runner. |
| intended use | Agriculture Q&A, farmer advisories, policy/research/rural knowledge dissemination. |
| successfully tested locally | Partial only: Hugging Face metadata and config file were downloaded and parsed locally. Full weights not loaded due size/custom-code/hardware decision. |
| limitations | Must be explanation layer only. Requires `trust_remote_code=True` for model load, which needs security review. Not deployed by HF inference providers at time of check. |
| final suitability | Promising LLM candidate for later explanation/RAG layer, not for diagnosis/prediction. |

### Candidate LLM-2: `Ila-AI/IlaAI-v3`

| Field | Finding |
| --- | --- |
| model/repository | `Ila-AI/IlaAI-v3` |
| source | Hugging Face: `https://huggingface.co/Ila-AI/IlaAI-v3` |
| license | Apache-2.0 per model card and metadata. |
| model size | Model card lists 4B params and 2.26 GB MLX 4-bit artifact. |
| architecture | Qwen3-4B / MLX LoRA fine-tune. |
| supported languages | English excellent, Hindi good, Telugu experimental per model card. |
| hardware requirements | Model card says trained on Apple M4 Mac Mini 24GB; MLX-oriented, which is Apple-centric. |
| inference method | MLX LM examples; local OpenAI-compatible MLX server. |
| intended use | Indian agriculture/farmer advice based on Kisan Call Center-style data. |
| successfully tested locally | Partial only: Hugging Face metadata and config file were downloaded and parsed locally. Full MLX load not tested on this Windows environment. |
| limitations | MLX is not suitable for this Windows deployment path without a separate Apple-hosted inference service or converted weights. Not for diagnosis/prediction. |
| final suitability | Good research candidate, but deployment mismatch for current Windows/Linux backend unless served separately. |

### Candidate LLM-3: General Indic/open LLM + curated agricultural RAG

| Field | Finding |
| --- | --- |
| model/repository | Examples: Sarvam/AI4Bharat/open Indic LLMs, plus vetted agriculture knowledge base. |
| source | AIKosh search page lists several Indic/open models, including Sarvam models and BharatGen models. |
| license | Varies by model; must verify per candidate. |
| model size | Varies widely. |
| supported languages | Potentially broad Indic language coverage. |
| inference method | Transformers/vLLM/TGI depending on model. |
| intended use | Explanation and translation layer only. |
| successfully tested locally | No. |
| limitations | Without agriculture fine-tuning/RAG, it may hallucinate agricultural advice. |
| final suitability | Backup approach only if paired with strict retrieval and guardrails. |

## Sources Consulted

- Hugging Face model page for plant disease MobileNetV2: `https://huggingface.co/linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification`
- Hugging Face model page for AgriParam: `https://huggingface.co/bharatgenai/AgriParam`
- Hugging Face model page for IlaAI-v3: `https://huggingface.co/Ila-AI/IlaAI-v3`
- BharatGen official site: `https://bharatgen.com/`
- AIKosh listing page: `https://aikosh.indiaai.gov.in/`
- Kaggle crop recommendation dataset listing found via search: `https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset`
- PMC/search result for MobileNetV3-small ONNX plant disease paper.

## Current Selection Status

No final model selected.

Most promising next checks:

1. Disease detection: clarify license and full local load for `linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification`.
2. Disease detection: locate the ONNX artifact/repository for MobileNetV3-small plant disease model and verify license.
3. Crop recommendation: continue searching for a licensed pretrained sklearn/joblib artifact. If none exists, propose training from verified Kaggle dataset after approval.
4. LLM: AgriParam looks more deployment-compatible with Linux/Transformers than IlaAI-v3; IlaAI-v3 is compelling but MLX-oriented.

## Do Not Proceed Yet

Do not implement API inference or train models until this document is reviewed and a candidate is approved.
