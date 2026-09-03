from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from common.models import UUIDPrimaryKeyModel


class CropScan(UUIDPrimaryKeyModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="crop_scans")
    image_object_key = models.CharField(max_length=255)
    model_name = models.CharField(max_length=120)
    model_version = models.CharField(max_length=80)
    prediction_json = models.JSONField(default=dict)
    confidence = models.DecimalField(max_digits=5, decimal_places=4, validators=[MinValueValidator(0), MaxValueValidator(1)])
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=["user", "-created_at"])]
