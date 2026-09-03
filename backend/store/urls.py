from django.http import JsonResponse
from django.urls import path

from store.views import CategoryListAPIView, ProductDetailAPIView, ProductListAPIView


def store_health(_request):
    return JsonResponse({"status": "ok", "module": "store"})


urlpatterns = [
    path("health/", store_health, name="store-health"),
    path("categories/", CategoryListAPIView.as_view(), name="category-list"),
    path("products/", ProductListAPIView.as_view(), name="product-list"),
    path("products/<uuid:id>/", ProductDetailAPIView.as_view(), name="product-detail"),
]
