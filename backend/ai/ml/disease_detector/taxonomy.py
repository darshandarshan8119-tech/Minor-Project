DISEASE_CATALOG = {
    "tomato_early_blight": {
        "crop": "Tomato",
        "disease_name": "Early Blight",
        "pathogen_type": "Fungal (Alternaria solani)",
        "severity_level": "Moderate",
        "symptoms": "Concentric dark brown rings on older leaves forming a target-board appearance.",
        "symptom_keys": {"brown_spots", "concentric_rings", "yellowing_lower_leaves"},
        "chemical_control": {
            "active_ingredient": "Mancozeb 75% WP or Chlorothalonil 75% WP",
            "commercial_names": ["Indofil M-45", "Kavach"],
            "dosage_per_acre": "2.0 - 2.5 g per litre of water",
            "application_instructions": "Repeat at 10-14 day intervals upon symptom appearance.",
            "withholding_period_days": 7,
        },
        "organic_biological_control": {
            "solution": "Neem seed kernel extract 5% or Trichoderma harzianum foliar spray @ 5g/L",
            "frequency": "Every 7 days during high humidity",
        },
        "preventive_measures": [
            "Prune infected lower leaves and destroy them away from field",
            "Avoid overhead irrigation; use drip to keep foliage dry",
            "Rotate with non-solanaceous crops for 2 seasons",
        ],
        "store_recommendations": [
            {
                "category": "Fungicide",
                "search_term": "Mancozeb",
                "display_name": "Mancozeb 75% WP Contact Fungicide",
            }
        ],
    },
    "rice_brown_spot": {
        "crop": "Rice",
        "disease_name": "Brown Spot",
        "pathogen_type": "Fungal (Bipolaris oryzae)",
        "severity_level": "Moderate",
        "symptoms": "Oval brown leaf lesions with grey centers, common under nutrient stress.",
        "symptom_keys": {"brown_spots", "oval_lesions", "grain_discoloration"},
        "chemical_control": {
            "active_ingredient": "Propiconazole 25% EC",
            "commercial_names": ["Tilt", "Bumper"],
            "dosage_per_acre": "200 ml in 200 L water",
            "application_instructions": "Spray at first lesion appearance and repeat after 12-15 days if needed.",
            "withholding_period_days": 15,
        },
        "organic_biological_control": {
            "solution": "Pseudomonas fluorescens seed treatment and foliar spray",
            "frequency": "At nursery and early tillering stage",
        },
        "preventive_measures": [
            "Use balanced potassium and nitrogen nutrition",
            "Avoid water stress",
            "Use disease-free seed",
        ],
        "store_recommendations": [{"category": "Fungicide", "search_term": "Propiconazole", "display_name": "Propiconazole 25% EC"}],
    },
    "wheat_yellow_rust": {
        "crop": "Wheat",
        "disease_name": "Yellow Rust",
        "pathogen_type": "Fungal (Puccinia striiformis)",
        "severity_level": "High",
        "symptoms": "Yellow-orange powdery stripes arranged along leaf veins.",
        "symptom_keys": {"yellow_rust_stripes", "powder_on_leaves", "linear_pustules"},
        "chemical_control": {
            "active_ingredient": "Propiconazole 25% EC or Tebuconazole 25.9% EC",
            "commercial_names": ["Tilt", "Folicur"],
            "dosage_per_acre": "200 ml in 200 L water",
            "application_instructions": "Spray immediately after symptoms cross economic threshold.",
            "withholding_period_days": 30,
        },
        "organic_biological_control": {
            "solution": "Use resistant varieties and balanced nitrogen; biological sprays have limited curative effect.",
            "frequency": "Preventive crop planning stage",
        },
        "preventive_measures": [
            "Grow rust-resistant varieties",
            "Avoid excessive nitrogen",
            "Monitor cool humid weather windows",
        ],
        "store_recommendations": [{"category": "Fungicide", "search_term": "Tebuconazole", "display_name": "Tebuconazole EC"}],
    },
}


def treatment_response(key: str, confidence: float) -> dict:
    item = DISEASE_CATALOG[key]
    return {
        "crop": item["crop"],
        "disease": item["disease_name"],
        "pathogen": item["pathogen_type"],
        "severity": item["severity_level"],
        "confidence": round(confidence, 4),
        "clinical_symptoms": item["symptoms"],
        "treatment": {
            "chemical": {
                "active_ingredient": item["chemical_control"]["active_ingredient"],
                "recommended_products": item["chemical_control"]["commercial_names"],
                "dosage": item["chemical_control"]["dosage_per_acre"],
                "spray_interval": item["chemical_control"]["application_instructions"],
                "withholding_period_days": item["chemical_control"]["withholding_period_days"],
            },
            "organic": {
                "remedy": item["organic_biological_control"]["solution"],
                "frequency": item["organic_biological_control"]["frequency"],
            },
            "cultural_practices": item["preventive_measures"],
        },
        "store_recommendations": item["store_recommendations"],
    }
