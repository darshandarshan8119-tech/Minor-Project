from __future__ import annotations

import base64
import json
import os
import urllib.error
import urllib.request
from io import BytesIO

from PIL import Image, UnidentifiedImageError

from ai.ml.disease_detector.taxonomy import DISEASE_CATALOG, treatment_response


class DiseaseImageRejected(ValueError):
    pass


class DiseaseModelUnavailable(RuntimeError):
    pass


def _validate_image(image_bytes: bytes) -> None:
    try:
        with Image.open(BytesIO(image_bytes)) as image:
            image.verify()
    except (UnidentifiedImageError, OSError) as exc:
        raise DiseaseImageRejected("Invalid image payload") from exc


def classify_image(image_bytes: bytes, crop_hint: str | None = None) -> dict:
    _validate_image(image_bytes)
    base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434").rstrip("/")
    model = os.getenv("OLLAMA_VISION_MODEL", "")
    if not model:
        raise DiseaseModelUnavailable("Ollama vision model is not configured.")

    classes = sorted(DISEASE_CATALOG)
    schema = {
        "type": "object",
        "properties": {
            "disease_key": {"type": "string", "enum": [*classes, "uncertain"]},
            "observed_signs": {"type": "string"},
        },
        "required": ["disease_key", "observed_signs"],
        "additionalProperties": False,
    }
    prompt = (
        "Inspect this crop leaf image for visible signs consistent with the supported disease classes. "
        "Return uncertain if the image is unclear, not a crop leaf, healthy, or does not clearly match one "
        "of the supported classes. Do not infer a diagnosis from the crop name alone. "
        f"Crop hint: {crop_hint or 'not provided'}. Supported disease keys: {', '.join(classes)}. "
        "Describe only visible signs briefly. This is a screening aid, not a confirmed diagnosis."
    )
    payload = {
        "model": model,
        "stream": False,
        "format": schema,
        "messages": [{
            "role": "user",
            "content": prompt,
            "images": [base64.b64encode(image_bytes).decode("ascii")],
        }],
        "options": {"temperature": 0},
    }
    request = urllib.request.Request(
        f"{base_url}/api/chat",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=int(os.getenv("OLLAMA_TIMEOUT_SECONDS", "120"))) as response:
            result = json.loads(response.read().decode("utf-8"))
    except (urllib.error.URLError, TimeoutError, OSError, json.JSONDecodeError) as exc:
        raise DiseaseModelUnavailable("Could not reach the configured Ollama vision model.") from exc

    try:
        answer = json.loads(result["message"]["content"])
        key = answer["disease_key"]
        signs = str(answer.get("observed_signs", "")).strip()
    except (KeyError, TypeError, json.JSONDecodeError) as exc:
        raise DiseaseModelUnavailable("Ollama returned an unreadable vision response.") from exc

    if key not in DISEASE_CATALOG:
        return {
            "status": "low_confidence",
            "message": "The configured vision model could not identify a supported disease from this image.",
        }

    diagnosis = treatment_response(key, confidence=0)
    diagnosis.pop("confidence", None)
    diagnosis["severity"] = None
    if signs:
        diagnosis["clinical_symptoms"] = signs
    diagnosis["status"] = "success"
    return diagnosis
