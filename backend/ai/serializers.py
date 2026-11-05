from rest_framework import serializers

from ai.models import CropRecommendationRecord, CropScan, SoilReport


class CropRecommendationRequestSerializer(serializers.Serializer):
    nitrogen = serializers.FloatField(min_value=0.0, max_value=350.0)
    phosphorus = serializers.FloatField(min_value=0.0, max_value=200.0)
    potassium = serializers.FloatField(min_value=0.0, max_value=350.0)
    temperature = serializers.FloatField(min_value=-10.0, max_value=60.0, default=26.0)
    humidity = serializers.FloatField(min_value=5.0, max_value=100.0, default=65.0)
    ph = serializers.FloatField(min_value=3.0, max_value=10.0, default=6.5)
    rainfall = serializers.FloatField(min_value=0.0, max_value=600.0, default=120.0)
    from_soil_report_id = serializers.UUIDField(required=False, allow_null=True)


class CropRecommendationRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = CropRecommendationRecord
        fields = [
            "id",
            "created_at",
            "nitrogen",
            "phosphorus",
            "potassium",
            "temperature",
            "humidity",
            "ph",
            "rainfall",
            "recommended_crop",
            "confidence",
            "alternatives",
            "soil_analysis",
            "agronomic_advisory",
            "from_soil_report",
        ]
        read_only_fields = ["id", "created_at"]


class DiseaseScanUploadSerializer(serializers.Serializer):
    image = serializers.FileField(required=True)
    crop_hint = serializers.CharField(required=False, allow_blank=True, default="")


class CropScanSerializer(serializers.ModelSerializer):
    class Meta:
        model = CropScan
        fields = [
            "id",
            "created_at",
            "image_url",
            "crop_name",
            "diagnosed_disease",
            "pathogen_type",
            "severity",
            "confidence",
            "treatment_plan",
            "diagnostic_source",
        ]
        read_only_fields = ["id", "created_at"]


class SymptomLookupSerializer(serializers.Serializer):
    crop = serializers.CharField(max_length=120)
    symptoms = serializers.ListField(
        child=serializers.CharField(max_length=120),
        allow_empty=False,
    )


class SoilReportUploadSerializer(serializers.Serializer):
    file = serializers.FileField(required=True)


class SoilReportConfirmSerializer(serializers.Serializer):
    report_id = serializers.UUIDField(required=True)
    verified_parameters = serializers.DictField(required=True)


class SoilReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoilReport
        fields = [
            "id",
            "created_at",
            "file_name",
            "file_path",
            "parsed_data",
            "confidence_data",
            "raw_snippets",
            "is_verified_by_user",
        ]
        read_only_fields = ["id", "created_at"]

