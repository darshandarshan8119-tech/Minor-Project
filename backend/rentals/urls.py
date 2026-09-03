from django.http import JsonResponse
from django.urls import path

from rentals.views import BookingCreateView, EquipmentListView, UserBookingsView


def rentals_health(_request):
    return JsonResponse({"status": "ok", "module": "rentals"})


urlpatterns = [
    path("health/", rentals_health, name="rentals-health"),
    path("equipment/", EquipmentListView.as_view(), name="equipment-list"),
    path("bookings/", UserBookingsView.as_view(), name="user-bookings"),
    path("book/", BookingCreateView.as_view(), name="create-booking"),
]
