CROP_DISPLAY = {
    "rice": "Rice (Paddy)",
    "maize": "Maize",
    "chickpea": "Chickpea",
    "kidneybeans": "Kidney Beans",
    "pigeonpeas": "Pigeon Pea",
    "mothbeans": "Moth Bean",
    "mungbean": "Mung Bean",
    "blackgram": "Black Gram",
    "lentil": "Lentil",
    "pomegranate": "Pomegranate",
    "banana": "Banana",
    "mango": "Mango",
    "grapes": "Grapes",
    "watermelon": "Watermelon",
    "muskmelon": "Muskmelon",
    "apple": "Apple",
    "orange": "Orange",
    "papaya": "Papaya",
    "coconut": "Coconut",
    "cotton": "Cotton",
    "jute": "Jute",
    "coffee": "Coffee",
}

CROP_ADVISORY = {
    "rice": {
        "ideal_sowing_window": "June - July (Kharif)",
        "water_requirement": "High (submerged or saturated conditions)",
        "fertilizer_plan": "Apply nitrogen in split doses at basal, tillering, and panicle initiation.",
        "commodity_symbol": "PADDY",
        "mandi_search_query": "Rice",
    },
    "cotton": {
        "ideal_sowing_window": "May - June",
        "water_requirement": "Medium; avoid waterlogging",
        "fertilizer_plan": "Use balanced NPK with potassium support during boll formation.",
        "commodity_symbol": "COTTON",
        "mandi_search_query": "Cotton",
    },
    "maize": {
        "ideal_sowing_window": "June - July or October - November",
        "water_requirement": "Medium; critical irrigation at tasseling and grain filling",
        "fertilizer_plan": "Apply basal phosphorus and split nitrogen at knee-high and tasseling stages.",
        "commodity_symbol": "MAIZE",
        "mandi_search_query": "Maize",
    },
}


def nutrient_status(value: float, low: float, optimal: float, excess: float) -> str:
    if value < low:
        return "Low"
    if value < optimal:
        return "Medium"
    if value <= excess:
        return "Optimal"
    return "Excess"


def assess_soil(features: dict) -> dict:
    n_status = nutrient_status(features["nitrogen"], 120, 240, 300)
    p_status = nutrient_status(features["phosphorus"], 20, 55, 110)
    k_status = nutrient_status(features["potassium"], 110, 220, 300)
    ph = features["ph"]
    if ph < 5.5:
        ph_status = "Acidic"
        ph_score = 60
    elif ph <= 7.5:
        ph_status = "Neutral (Ideal)"
        ph_score = 100
    elif ph <= 8.5:
        ph_status = "Alkaline"
        ph_score = 70
    else:
        ph_status = "Highly alkaline"
        ph_score = 45

    nutrient_scores = {"Low": 45, "Medium": 70, "Optimal": 100, "Excess": 65}
    score = (
        nutrient_scores[n_status] + nutrient_scores[p_status] + nutrient_scores[k_status] + ph_score
    ) / 4
    return {
        "nitrogen_status": n_status,
        "phosphorus_status": p_status,
        "potassium_status": k_status,
        "ph_status": ph_status,
        "soil_health_index": round(score, 2),
    }


def fertilizer_adjustment(soil: dict) -> list[str]:
    advice = []
    if soil["nitrogen_status"] in {"Low", "Medium"}:
        advice.append("Increase nitrogen through split urea application or organic compost.")
    if soil["phosphorus_status"] in {"Low", "Medium"}:
        advice.append("Apply phosphorus-rich basal fertilizer before sowing.")
    if soil["potassium_status"] in {"Low", "Medium"}:
        advice.append("Add muriate of potash where soil tests indicate potassium deficiency.")
    if soil["ph_status"] == "Acidic":
        advice.append("Use agricultural lime after local soil testing recommendation.")
    if soil["ph_status"] in {"Alkaline", "Highly alkaline"}:
        advice.append("Use organic matter and gypsum where sodicity is confirmed.")
    return advice or ["Maintain balanced nutrient management and retest soil before next crop cycle."]


def advisory_for_crop(crop: str) -> dict:
    base = CROP_ADVISORY.get(
        crop,
        {
            "ideal_sowing_window": "Follow local agro-climatic calendar",
            "water_requirement": "Moderate; avoid drought stress and waterlogging",
            "fertilizer_plan": "Use soil-test-based balanced NPK and organic matter.",
            "commodity_symbol": crop.upper(),
            "mandi_search_query": CROP_DISPLAY.get(crop, crop.title()),
        },
    )
    return {
        "ideal_sowing_window": base["ideal_sowing_window"],
        "water_requirement": base["water_requirement"],
        "fertilizer_plan": base["fertilizer_plan"],
    }


def market_linkage(crop: str) -> dict:
    base = CROP_ADVISORY.get(crop, {})
    return {
        "commodity_symbol": base.get("commodity_symbol", crop.upper()),
        "mandi_search_query": base.get("mandi_search_query", CROP_DISPLAY.get(crop, crop.title())),
    }
