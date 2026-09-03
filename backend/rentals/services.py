from decimal import Decimal

from django.db import transaction

from common.idempotency import reserve_idempotency_key
from common.outbox import enqueue_event
from rentals.models import Booking, Equipment


class EquipmentUnavailable(Exception):
    pass


def create_booking(*, user, equipment_id, start_date, end_date, rental_mode, with_driver, acreage_estimate, idempotency_key):
    idem = reserve_idempotency_key(
        "rentals.booking.create",
        idempotency_key,
        {
            "user_id": str(user.id),
            "equipment_id": str(equipment_id),
            "start_date": str(start_date),
            "end_date": str(end_date),
            "rental_mode": rental_mode,
            "with_driver": with_driver,
            "acreage_estimate": str(acreage_estimate),
        },
    )

    with transaction.atomic():
        equipment = Equipment.objects.select_for_update().get(id=equipment_id)
        if not equipment.is_available or equipment.maintenance_status != Equipment.MaintenanceStatus.READY:
            raise EquipmentUnavailable("Equipment is not ready for booking")

        overlapping = Booking.objects.select_for_update().filter(
            equipment=equipment,
            booking_status__in=[Booking.Status.PENDING_PAYMENT, Booking.Status.CONFIRMED, Booking.Status.IN_TRANSIT, Booking.Status.ACTIVE],
            start_date__lte=end_date,
            end_date__gte=start_date,
        )
        if overlapping.exists():
            raise EquipmentUnavailable("Equipment already booked for the selected dates")

        days = (end_date - start_date).days + 1
        if rental_mode == Booking.RentalMode.ACREAGE:
            total = equipment.rental_rate_acre * Decimal(acreage_estimate or 0)
        else:
            total = equipment.rental_rate_daily * days
        if with_driver:
            total += equipment.driver_daily_fee * days

        booking = Booking.objects.create(
            user=user,
            equipment=equipment,
            start_date=start_date,
            end_date=end_date,
            rental_mode=rental_mode,
            acreage_estimate=acreage_estimate,
            with_driver=with_driver,
            village_pincode=user.village_pincode,
            total_cost=total,
            idempotency_key=idem.id,
        )
        enqueue_event("booking.created", "rentals_booking", booking.id, {"booking_id": str(booking.id)})
        return booking
