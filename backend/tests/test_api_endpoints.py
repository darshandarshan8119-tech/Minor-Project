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
