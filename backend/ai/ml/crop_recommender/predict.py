from __future__ import annotations

from functools import lru_cache
from pathlib import Path

import joblib
import numpy as np

from ai.ml.crop_recommender.agronomic_rules import (
    CROP_DISPLAY,
    advisory_for_crop,
    assess_soil,
    fertilizer_adjustment,
    market_linkage,
)
from ai.ml.crop_recommender.train import FEATURE_NAMES, train


@lru_cache(maxsize=1)
def load_model() -> dict:
    model_path = Path(__file__).with_name("model.joblib")
    if not model_path.exists():
        train(model_path)
    return joblib.load(model_path)


def predict_crop(features: dict) -> dict:
    artifact = load_model()
    row = np.array([[float(features[name]) for name in FEATURE_NAMES]])
    pipeline = artifact["pipeline"]
    probabilities = pipeline.predict_proba(row)[0]
    classes = list(pipeline.classes_)
    ranked = sorted(zip(classes, probabilities, strict=True), key=lambda item: item[1], reverse=True)
    primary_crop, confidence = ranked[0]
    top_alternatives = [
        {
            "crop": crop,
            "display_name": CROP_DISPLAY.get(crop, crop.title()),
            "confidence": round(float(probability), 4),
        }
        for crop, probability in ranked[1:4]
    ]
    soil_assessment = assess_soil(features)
    agronomic_advisory = advisory_for_crop(primary_crop)
    agronomic_advisory["suggested_fertilizer_adjustment"] = fertilizer_adjustment(soil_assessment)
    return {
        "primary_crop": primary_crop,
        "display_name": CROP_DISPLAY.get(primary_crop, primary_crop.title()),
        "confidence": round(float(confidence), 4),
        "top_alternatives": top_alternatives,
        "soil_assessment": soil_assessment,
        "agronomic_advisory": agronomic_advisory,
        "market_linkage": market_linkage(primary_crop),
        "model_metadata": {
            "cv_accuracy": artifact.get("cv_accuracy"),
            "holdout_accuracy": artifact.get("holdout_accuracy"),
            "dataset": artifact.get("dataset"),
        },
    }
