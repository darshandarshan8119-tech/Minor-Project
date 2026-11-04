from __future__ import annotations

from io import BytesIO

import numpy as np
from PIL import Image, UnidentifiedImageError

from ai.ml.disease_detector.taxonomy import treatment_response


class DiseaseImageRejected(ValueError):
    pass


def _leaf_metrics(image_bytes: bytes) -> dict:
    try:
        image = Image.open(BytesIO(image_bytes)).convert("RGB").resize((224, 224))
    except UnidentifiedImageError as exc:
        raise DiseaseImageRejected("Invalid image payload") from exc
    pixels = np.asarray(image, dtype=np.float32) / 255.0
    r = pixels[:, :, 0]
    g = pixels[:, :, 1]
    b = pixels[:, :, 2]
    green_mask = (g > r * 1.08) & (g > b * 1.08)
    brown_mask = (r > 0.28) & (g > 0.16) & (g < 0.55) & (b < 0.35) & (r >= g)
    yellow_mask = (r > 0.55) & (g > 0.48) & (b < 0.32)
    dark_mask = (r < 0.25) & (g < 0.25) & (b < 0.25)
    return {
        "green_ratio": float(green_mask.mean()),
        "brown_ratio": float(brown_mask.mean()),
        "yellow_ratio": float(yellow_mask.mean()),
        "dark_ratio": float(dark_mask.mean()),
        "mean_green": float(g.mean()),
    }


def classify_image(image_bytes: bytes, crop_hint: str | None = None) -> dict:
    metrics = _leaf_metrics(image_bytes)
    plant_score = metrics["green_ratio"] + metrics["brown_ratio"] * 0.6 + metrics["yellow_ratio"] * 0.4
    if plant_score < 0.18:
        return {
            "status": "low_confidence_or_non_plant",
            "confidence": round(plant_score, 4),
            "message": "Image does not contain enough plant-like visual features for a reliable diagnosis.",
        }

    crop = (crop_hint or "").strip().lower()
    if crop == "rice" or metrics["brown_ratio"] > 0.18 and metrics["green_ratio"] > 0.22:
        key = "rice_brown_spot"
    elif crop == "wheat" or metrics["yellow_ratio"] > 0.08:
        key = "wheat_yellow_rust"
    else:
        key = "tomato_early_blight"

    confidence = min(0.94, max(0.36, plant_score + metrics["brown_ratio"] + metrics["yellow_ratio"] * 0.5))
    response = treatment_response(key, confidence)
    response["status"] = "success"
    response["image_metrics"] = metrics
    return response
