from __future__ import annotations

from pathlib import Path

import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import StratifiedKFold, cross_val_score, train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

CROPS = [
    "rice",
    "maize",
    "chickpea",
    "kidneybeans",
    "pigeonpeas",
    "mothbeans",
    "mungbean",
    "blackgram",
    "lentil",
    "pomegranate",
    "banana",
    "mango",
    "grapes",
    "watermelon",
    "muskmelon",
    "apple",
    "orange",
    "papaya",
    "coconut",
    "cotton",
    "jute",
    "coffee",
]

FEATURE_NAMES = ["nitrogen", "phosphorus", "potassium", "temperature", "humidity", "ph", "rainfall"]

# Agronomic centroids derived from public crop-recommendation benchmark patterns.
CROP_CENTROIDS = {
    "rice": [90, 42, 43, 21, 82, 6.5, 203],
    "maize": [70, 48, 20, 23, 65, 6.3, 85],
    "chickpea": [40, 67, 79, 18, 16, 7.4, 80],
    "kidneybeans": [20, 67, 20, 20, 21, 5.8, 105],
    "pigeonpeas": [20, 70, 20, 28, 48, 5.8, 150],
    "mothbeans": [20, 48, 20, 28, 53, 6.8, 51],
    "mungbean": [20, 47, 20, 28, 85, 6.7, 48],
    "blackgram": [40, 67, 20, 30, 65, 7.1, 67],
    "lentil": [20, 68, 20, 24, 64, 6.9, 46],
    "pomegranate": [20, 18, 40, 24, 90, 6.4, 107],
    "banana": [100, 80, 50, 27, 80, 6.4, 105],
    "mango": [20, 27, 30, 31, 50, 5.8, 95],
    "grapes": [20, 130, 200, 24, 82, 6.0, 70],
    "watermelon": [100, 10, 50, 25, 85, 6.5, 50],
    "muskmelon": [100, 10, 50, 28, 92, 6.4, 25],
    "apple": [20, 125, 200, 22, 92, 5.9, 110],
    "orange": [20, 10, 10, 23, 92, 7.0, 110],
    "papaya": [50, 60, 50, 34, 92, 6.7, 120],
    "coconut": [20, 20, 30, 27, 95, 5.9, 170],
    "cotton": [120, 40, 20, 24, 80, 6.8, 80],
    "jute": [80, 40, 40, 25, 80, 6.5, 175],
    "coffee": [100, 30, 30, 25, 58, 6.8, 160],
}

STD_DEV = np.array([7.0, 5.0, 6.0, 1.2, 3.0, 0.18, 8.0])


def build_dataset(samples_per_crop: int = 180, random_state: int = 42) -> tuple[np.ndarray, np.ndarray]:
    rng = np.random.default_rng(random_state)
    rows = []
    labels = []
    for crop in CROPS:
        centroid = np.array(CROP_CENTROIDS[crop], dtype=float)
        crop_rows = rng.normal(centroid, STD_DEV, size=(samples_per_crop, len(FEATURE_NAMES)))
        crop_rows[:, 0] = np.clip(crop_rows[:, 0], 0, 300)
        crop_rows[:, 1] = np.clip(crop_rows[:, 1], 0, 150)
        crop_rows[:, 2] = np.clip(crop_rows[:, 2], 0, 300)
        crop_rows[:, 3] = np.clip(crop_rows[:, 3], 5, 50)
        crop_rows[:, 4] = np.clip(crop_rows[:, 4], 10, 100)
        crop_rows[:, 5] = np.clip(crop_rows[:, 5], 3.5, 9.5)
        crop_rows[:, 6] = np.clip(crop_rows[:, 6], 20, 400)
        rows.append(crop_rows)
        labels.extend([crop] * samples_per_crop)
    return np.vstack(rows), np.array(labels)


def build_pipeline() -> Pipeline:
    return Pipeline(
        steps=[
            ("scale", StandardScaler()),
            (
                "model",
                RandomForestClassifier(
                    n_estimators=100,
                    max_depth=12,
                    random_state=42,
                    class_weight="balanced",
                    n_jobs=-1,
                ),
            ),
        ]
    )


def train(output_path: Path | None = None) -> dict:
    x, y = build_dataset()
    pipeline = build_pipeline()
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    cv_scores = cross_val_score(pipeline, x, y, cv=cv, scoring="accuracy")
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, stratify=y, random_state=42)
    pipeline.fit(x_train, y_train)
    holdout_accuracy = accuracy_score(y_test, pipeline.predict(x_test))
    output_path = output_path or Path(__file__).with_name("model.joblib")
    joblib.dump(
        {
            "pipeline": pipeline,
            "feature_names": FEATURE_NAMES,
            "classes": CROPS,
            "cv_accuracy": float(np.mean(cv_scores)),
            "holdout_accuracy": float(holdout_accuracy),
            "dataset": "synthetic-agronomic-centroid-v1",
        },
        output_path,
    )
    return {
        "model_path": str(output_path),
        "cv_accuracy": round(float(np.mean(cv_scores)), 4),
        "holdout_accuracy": round(float(holdout_accuracy), 4),
    }


if __name__ == "__main__":
    print(train())
