from rest_framework import serializers

from rentals.models import Booking, Equipment


class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = [
            "id",
            "name",
            "model",
            "horsepower",
            "rental_rate_daily",
            "rental_rate_acre",
            "driver_daily_fee",
            "home_pincode",
            "is_available",
            "maintenance_status",
        ]


class BookingCreateSerializer(serializers.Serializer):
    equipment_id = serializers.UUIDField()
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    rental_mode = serializers.ChoiceField(choices=Booking.RentalMode.choices)
    with_driver = serializers.BooleanField(default=False)
    acreage_estimate = serializers.DecimalField(max_digits=10, decimal_places=2, required=False, allow_null=True)
    idempotency_key = serializers.CharField(max_length=80)


class BookingSerializer(serializers.ModelSerializer):
    equipment_name = serializers.CharField(source="equipment.name", read_only=True)
    equipment_model = serializers.CharField(source="equipment.model", read_only=True)

    class Meta:
        model = Booking
        fields = [
            "id",
            "equipment",
            "equipment_name",
            "equipment_model",
            "start_date",
            "end_date",
            "rental_mode",
            "acreage_estimate",
            "with_driver",
            "village_pincode",
            "total_cost",
            "booking_status",
            "created_at",
        ]
        read_only_fields = ["id", "total_cost", "booking_status", "created_at"]
