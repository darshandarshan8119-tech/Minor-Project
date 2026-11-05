from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from common.models import TimeStampedModel, UUIDPrimaryKeyModel


class SoilReport(UUIDPrimaryKeyModel, TimeStampedModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="soil_reports",
    )
    file_name = models.CharField(max_length=255)
    file_path = models.CharField(max_length=512, blank=True)
    parsed_data = models.JSONField(default=dict)
    confidence_data = models.JSONField(default=dict)
    raw_snippets = models.TextField(blank=True)
    is_verified_by_user = models.BooleanField(default=False)

    class Meta:
        indexes = [models.Index(fields=["user", "-created_at"])]


class CropRecommendationRecord(UUIDPrimaryKeyModel, TimeStampedModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="crop_recommendations",
    )
    nitrogen = models.FloatField()
    phosphorus = models.FloatField()
    potassium = models.FloatField()
    temperature = models.FloatField()
    humidity = models.FloatField()
    ph = models.FloatField()
    rainfall = models.FloatField()
    recommended_crop = models.CharField(max_length=100)
    confidence = models.DecimalField(
        max_digits=5,
        decimal_places=4,
        validators=[MinValueValidator(0), MaxValueValidator(1)],
    )
    alternatives = models.JSONField(default=list)
    soil_analysis = models.JSONField(default=dict)
    agronomic_advisory = models.JSONField(default=dict)
    from_soil_report = models.ForeignKey(SoilReport, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        indexes = [models.Index(fields=["user", "-created_at"])]


class CropScan(UUIDPrimaryKeyModel, TimeStampedModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="crop_scans",
    )
    image_url = models.CharField(max_length=512, blank=True)
    crop_name = models.CharField(max_length=120)
    diagnosed_disease = models.CharField(max_length=200)
    pathogen_type = models.CharField(max_length=80)
    severity = models.CharField(max_length=50, null=True, blank=True)
    confidence = models.DecimalField(
        max_digits=5,
        decimal_places=4,
        null=True,
        blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(1)],
    )
    treatment_plan = models.JSONField(default=dict)
    diagnostic_source = models.CharField(max_length=50, default="image_scan")

    class Meta:
        indexes = [models.Index(fields=["user", "-created_at"])]
