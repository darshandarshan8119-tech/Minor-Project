from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from rentals.models import Booking, Equipment
from rentals.serializers import BookingCreateSerializer, BookingSerializer, EquipmentSerializer
from rentals.services import EquipmentUnavailable, create_booking


class EquipmentListView(generics.ListAPIView):
    queryset = Equipment.objects.all().order_by("rental_rate_daily")
    serializer_class = EquipmentSerializer
    permission_classes = [permissions.AllowAny]


class BookingCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = BookingCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        try:
            booking = create_booking(
                user=request.user,
                equipment_id=data["equipment_id"],
                start_date=data["start_date"],
                end_date=data["end_date"],
                rental_mode=data["rental_mode"],
                with_driver=data.get("with_driver", False),
                acreage_estimate=data.get("acreage_estimate"),
                idempotency_key=data["idempotency_key"],
            )
            return Response(BookingSerializer(booking).data, status=status.HTTP_201_CREATED)
        except EquipmentUnavailable as exc:
            return Response({"error": str(exc)}, status=status.HTTP_409_CONFLICT)
        except Exception as exc:
            return Response({"error": str(exc)}, status=status.HTTP_400_BAD_REQUEST)


class UserBookingsView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user).order_by("-created_at")
