from ai.ml.disease_detector.taxonomy import DISEASE_CATALOG, treatment_response


def lookup_symptoms(crop: str, symptoms: list[str]) -> dict:
    crop_normalized = crop.strip().lower()
    symptom_set = {symptom.strip().lower() for symptom in symptoms}
    best_key = None
    best_score = 0.0
    for key, item in DISEASE_CATALOG.items():
        if item["crop"].lower() != crop_normalized:
            continue
        known = item["symptom_keys"]
        score = len(symptom_set & known) / max(len(known), 1)
        if score > best_score:
            best_key = key
            best_score = score

    if not best_key:
        return {
            "status": "no_match",
            "message": "No confident pathology match for the supplied crop and symptoms.",
            "confidence": 0.0,
        }
    response = treatment_response(best_key, max(0.35, best_score))
    response["status"] = "success"
    return response
