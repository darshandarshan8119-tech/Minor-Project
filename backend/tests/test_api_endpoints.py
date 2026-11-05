import pytest
from rest_framework.test import APIClient

from users.models import CustomUser


@pytest.mark.django_db
def test_categories_endpoint_returns_success():
    client = APIClient()
    response = client.get("/api/v1/store/categories/", secure=True)
    assert response.status_code == 200
    assert isinstance(response.json(), list)


@pytest.mark.django_db
def test_products_endpoint_returns_success():
    client = APIClient()
    response = client.get("/api/v1/store/products/", secure=True)
    assert response.status_code == 200
    assert isinstance(response.json(), list)


@pytest.mark.django_db
def test_equipment_endpoint_returns_success():
    client = APIClient()
    response = client.get("/api/v1/rentals/equipment/", secure=True)
    assert response.status_code == 200
    assert isinstance(response.json(), list)


@pytest.mark.django_db
def test_mandi_tickers_endpoint_returns_success():
    client = APIClient()
    response = client.get("/api/v1/mandi/tickers/", secure=True)
    assert response.status_code == 200
    assert isinstance(response.json(), list)


@pytest.mark.django_db
def test_auth_login_endpoint_issues_jwt():
    client = APIClient()
    user = CustomUser.objects.create(
        phone="9876540001",
        full_name="Testing User",
        role=CustomUser.Role.FARMER,
        is_verified=True,
    )
    user.set_password("SecurePass1234!")
    user.save()

    response = client.post(
        "/api/v1/auth/login/",
        {"identifier": "9876540001", "password": "SecurePass1234!"},
        format="json",
        secure=True,
    )
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "success"
    assert "tokens" in body
    assert "access" in body["tokens"]
    assert "refresh" in body["tokens"]
    assert body["user"]["phone"] == "9876540001"


@pytest.mark.django_db
def test_assistant_chat_endpoint(monkeypatch):
    monkeypatch.setenv("MARKET_LLM_PROVIDER", "rule_based")
    from decimal import Decimal
    from mandi.models import APMC, Commodity, DailyTicker
    import datetime

    apmc = APMC.objects.create(name="Ludhiana APMC", state="Punjab", district="Ludhiana", market_code="PB-LDH-01")
    commodity = Commodity.objects.create(
        name="Wheat Sharbati", code="WHEAT-SHAR", category="Cereals", standard_msp_rate=Decimal("2275"),
        agmarknet_modal_rate=Decimal("2400"),
    )
    DailyTicker.objects.create(
        mandi=apmc, commodity=commodity, modal_price=Decimal("2450"), min_price=Decimal("2400"),
        max_price=Decimal("2500"), arrivals_volume=Decimal("100"), source="TEST", recorded_at=datetime.date.today(),
    )

    client = APIClient()
    user = CustomUser.objects.create(
        phone="9876540002",
        full_name="Assistant Tester",
        role=CustomUser.Role.FARMER,
        is_verified=True,
    )
    client.force_authenticate(user=user)
    response = client.post(
        "/api/v1/assistant/chat/",
        {
            "message": "What is the modal price of Wheat in Ludhiana APMC?",
            "explanation_level": "simple",
            "language": "en",
        },
        format="json",
        secure=True,
    )
    assert response.status_code == 201
    data = response.json()
    assert "conversation" in data
    assert "message" in data
    assert data["message"]["role"] == "assistant"
    assert data["message"]["card_type"] == "price"


@pytest.mark.django_db
def test_transactions_and_bookings_endpoints():
    client = APIClient()
    user = CustomUser.objects.create(
        phone="9876540003",
        full_name="Trans Booking Tester",
        role=CustomUser.Role.FARMER,
        is_verified=True,
    )
    client.force_authenticate(user=user)

    txn_res = client.get("/api/v1/transactions/", secure=True)
    assert txn_res.status_code == 200
    assert isinstance(txn_res.json(), list)

    book_res = client.get("/api/v1/bookings/my-bookings/", secure=True)
    assert book_res.status_code == 200
    assert isinstance(book_res.json(), list)
