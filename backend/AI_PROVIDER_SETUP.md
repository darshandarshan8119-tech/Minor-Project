# AI Provider Setup

AgriMart Market Copilot and AG Crop image assessment use separate providers and settings.

## Market Copilot: OpenRouter

1. Copy `backend/.env.example` to `backend/.env` if the local environment file does not exist.
2. Set `MARKET_LLM_PROVIDER=openrouter`.
3. Paste the key into `OPENROUTER_API_KEY` and set `OPENROUTER_MODEL` to the exact model slug enabled for that key.
4. Restart the Django backend.

The key is read only by the backend. Do not add it to frontend environment variables, source code, or browser storage. Requests are constrained by the Market Copilot system instructions and market-domain guardrail. If the key/model is missing or the provider request fails, the API reports `model_unavailable`; it does not switch to a generated rule-based answer.

## Crop Clinic: Ollama vision model

1. Install and start Ollama on the same machine/network reachable by the Django backend.
2. Pull a Qwen vision model in Ollama and note its exact local model tag (for example, `qwen2.5vl:7b` if that is the tag you installed).
3. Set `OLLAMA_BASE_URL` to the Ollama server address and `OLLAMA_VISION_MODEL` to that exact tag in `backend/.env`.
4. Restart Django. Upload a crop image in Disease Clinic to test the connection.

The backend sends image bytes to Ollama's `/api/chat` endpoint with the model's vision `images` input and constrained JSON output. Only classes present in the existing disease taxonomy can be returned as a disease assessment. Other responses become `low_confidence`; missing configuration, connection errors, timeouts, and unreadable model output become `model_unavailable`. The model output is not treated as calibrated confidence or disease severity. Supported disease classes and mapped treatment content remain the existing taxonomy; the model does not generate treatment or pesticide advice.

## Separation

`MARKET_LLM_*` and `OPENROUTER_*` configure the market conversation path. `OLLAMA_*` configures only image assessment. No provider key or local model endpoint is exposed to the frontend. The symptom questionnaire remains a separate existing backend endpoint and does not invoke the image model.
