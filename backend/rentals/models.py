from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models

from common.models import TimeStampedModel, UUIDPrimaryKeyModel


class Equipment(UUIDPrimaryKeyModel):
    class MaintenanceStatus(models.TextChoices):
        READY = "ready", "Ready"
        SCHEDULED = "scheduled", "Scheduled"
        IN_SERVICE = "in_service", "In service"
        RETIRED = "retired", "Retired"

    name = models.CharField(max_length=180)
    model = models.CharField(max_length=120)
    horsepower = models.PositiveIntegerField()
    rental_rate_daily = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    rental_rate_acre = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    driver_daily_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    home_pincode = models.CharField(max_length=6)
    is_available = models.BooleanField(default=True)
    maintenance_status = models.CharField(max_length=20, choices=MaintenanceStatus.choices, default=MaintenanceStatus.READY)

    def __str__(self) -> str:
        return f"{self.name} {self.model}"


class Booking(UUIDPrimaryKeyModel, TimeStampedModel):
    class RentalMode(models.TextChoices):
        DAILY = "daily", "Daily"
        ACREAGE = "acreage", "Acreage"

    class Status(models.TextChoices):
        PENDING_PAYMENT = "pending_payment", "Pending payment"
        CONFIRMED = "confirmed", "Confirmed"
        IN_TRANSIT = "in_transit", "In transit"
        ACTIVE = "active", "Active"
        COMPLETED = "completed", "Completed"
        CANCELLED = "cancelled", "Cancelled"
        REFUNDED = "refunded", "Refunded"

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="rental_bookings")
    equipment = models.ForeignKey(Equipment, on_delete=models.PROTECT, related_name="bookings")
    start_date = models.DateField()
    end_date = models.DateField()
    rental_mode = models.CharField(max_length=20, choices=RentalMode.choices)
    acreage_estimate = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    with_driver = models.BooleanField(default=False)
    village_pincode = models.CharField(max_length=6)
    total_cost = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(0)])
    booking_status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING_PAYMENT)
    idempotency_key = models.UUIDField(unique=True)

    class Meta:
        indexes = [models.Index(fields=["equipment", "start_date", "end_date"])]
        constraints = [models.CheckConstraint(condition=models.Q(end_date__gte=models.F("start_date")), name="booking_end_gte_start")]


class MaintenanceLog(UUIDPrimaryKeyModel):
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE, related_name="maintenance_logs")
    status = models.CharField(max_length=80)
    notes = models.TextField(blank=True)
    starts_at = models.DateTimeField()
    ends_at = models.DateTimeField(null=True, blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
