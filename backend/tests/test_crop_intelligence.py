from decimal import Decimal
from io import BytesIO
import pytest
from PIL import Image
from rest_framework.test import APIClient

from ai.ml.crop_recommender.agronomic_rules import assess_soil, fertilizer_adjustment
from ai.ml.disease_detector.fallback_engine import lookup_symptoms
from ai.models import CropRecommendationRecord, CropScan, SoilReport
from users.models import CustomUser


def _generate_synthetic_image(is_leaf: bool = True) -> bytes:
    img = Image.new("RGB", (224, 224), color=(34, 139, 34) if is_leaf else (10, 10, 10))
    buffer = BytesIO()
    img.save(buffer, format="JPEG")
    return buffer.getvalue()


def test_agronomic_rules_soil_assessment():
    soil = assess_soil({
        "nitrogen": 80,
        "phosphorus": 35,
        "potassium": 150,
        "ph": 6.8,
    })
    assert "soil_health_index" in soil
    assert soil["ph_status"] == "Neutral (Ideal)"
    assert soil["nitrogen_status"] in {"Low", "Medium"}

    advice = fertilizer_adjustment(soil)
    assert any("nitrogen" in a.lower() for a in advice)


def test_symptom_lookup_deterministic():
    res = lookup_symptoms("Tomato", ["brown_spots", "concentric_rings"])
    assert res["status"] == "success"
    assert res["disease"] == "Early Blight"
    assert "treatment" in res
    assert "chemical" in res["treatment"]


@pytest.mark.django_db
def test_crop_recommendation_api():
    client = APIClient()
    user = CustomUser.objects.create(phone="9876541111", full_name="Kisan Farmer", role=CustomUser.Role.FARMER)
    client.force_authenticate(user=user)

    response = client.post(
        "/api/v1/crop-intelligence/recommend/",
        {
            "nitrogen": 120.0,
            "phosphorus": 45.0,
            "potassium": 35.0,
            "temperature": 27.0,
            "humidity": 70.0,
            "ph": 6.5,
            "rainfall": 180.0,
        },
        format="json",
        secure=True,
    )
    assert response.status_code == 201
    data = response.json()
    assert data["primary_crop"] == "rice"
    assert "alternatives" in data
    assert "soil_assessment" in data
    assert "Deterministic Agronomic Rules" in data["engine"]

    # Verify database persistence
    record = CropRecommendationRecord.objects.get(id=data["record_id"])
    assert record.user == user
    assert record.rainfall == 180.0


@pytest.mark.django_db
def test_disease_detection_api_leaf_scan_and_rejection():
    client = APIClient()
    user = CustomUser.objects.create(phone="9876542222", full_name="Pathology Farmer", role=CustomUser.Role.FARMER)
    client.force_authenticate(user=user)

    # 1. Non-leaf / low-plant image should be honestly rejected
    dark_image = _generate_synthetic_image(is_leaf=False)
    dark_file = BytesIO(dark_image)
    dark_file.name = "dark_photo.jpg"

    res_rejected = client.post(
        "/api/v1/crop-intelligence/disease-scan/",
        {"image": dark_file},
        format="multipart",
        secure=True,
    )
    assert res_rejected.status_code == 200
    assert res_rejected.json()["status"] == "rejected"

    # 2. Plant leaf image should be accepted and diagnosed
    leaf_image = _generate_synthetic_image(is_leaf=True)
    leaf_file = BytesIO(leaf_image)
    leaf_file.name = "infected_leaf.jpg"

    res_success = client.post(
        "/api/v1/crop-intelligence/disease-scan/",
        {"image": leaf_file, "crop_hint": "rice"},
        format="multipart",
        secure=True,
    )
    assert res_success.status_code == 201
    diag = res_success.json()
    assert diag["status"] == "success"
    assert "treatment_plan" in diag
    assert "chemical_control" in diag["treatment_plan"]

    # Verify DB persistence
    scan = CropScan.objects.get(id=diag["scan_id"])
    assert scan.user == user
    assert scan.crop_name != ""


@pytest.mark.django_db
def test_soil_report_ocr_upload_and_confirmation():
    client = APIClient()
    user = CustomUser.objects.create(phone="9876543333", full_name="Soil Tester", role=CustomUser.Role.FARMER)
    client.force_authenticate(user=user)

    shc_text = "Soil Health Card SHC-PB-2026-9812. Nitrogen: 125 kg/ha, Phosphorus: 38 kg/ha, Potassium: 180 kg/ha, pH: 7.2"
    report_file = BytesIO(shc_text.encode("utf-8"))
    report_file.name = "soil_card.txt"

    # 1. Upload unverified report
    upload_res = client.post(
        "/api/v1/crop-intelligence/soil-report/",
        {"file": report_file},
        format="multipart",
        secure=True,
    )
    assert upload_res.status_code == 201
    report_data = upload_res.json()
    assert report_data["is_verified_by_user"] is False
    assert report_data["card_reference_number"] == "SHC-PB-2026-9812"
    assert report_data["extracted_parameters"]["nitrogen"] == 125.0

    report_id = report_data["report_id"]

    # 2. Confirm report after review
    confirm_res = client.post(
        "/api/v1/crop-intelligence/soil-report/confirm/",
        {
            "report_id": report_id,
            "verified_parameters": {
                "nitrogen": 130.0,
                "phosphorus": 38.0,
                "potassium": 180.0,
                "ph": 7.2,
            },
        },
        format="json",
        secure=True,
    )
    assert confirm_res.status_code == 200
    assert confirm_res.json()["is_verified_by_user"] is True

    persisted = SoilReport.objects.get(id=report_id)
    assert persisted.is_verified_by_user is True
    assert persisted.parsed_data["nitrogen"] == 130.0


@pytest.mark.django_db
def test_user_history_isolation():
    client = APIClient()
    user_a = CustomUser.objects.create(phone="9876544444", full_name="User Alpha", role=CustomUser.Role.FARMER)
    user_b = CustomUser.objects.create(phone="9876545555", full_name="User Beta", role=CustomUser.Role.FARMER)

    CropScan.objects.create(user=user_a, crop_name="Tomato", diagnosed_disease="Early Blight", severity="Moderate", confidence=Decimal("0.9"))
    CropScan.objects.create(user=user_b, crop_name="Rice", diagnosed_disease="Brown Spot", severity="High", confidence=Decimal("0.95"))

    client.force_authenticate(user=user_a)
    history_res = client.get("/api/v1/crop-intelligence/history/", secure=True)
    assert history_res.status_code == 200
    scans = history_res.json()["scans"]
    assert len(scans) == 1
    assert scans[0]["crop_name"] == "Tomato"
