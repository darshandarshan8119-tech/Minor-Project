from django.urls import path

from ai import views

urlpatterns = [
    # Crop Recommendation
    path("recommend/", views.CropRecommendationView.as_view(), name="crop-recommend"),
    path("crop-recommend/", views.CropRecommendationView.as_view(), name="ai-crop-recommend"),

    # Disease Detection & Symptom Lookup
    path("disease-scan/", views.DiseaseDetectionView.as_view(), name="disease-scan"),
    path("detect-disease/", views.DiseaseDetectionView.as_view(), name="ai-detect-disease"),
    path("symptom-lookup/", views.SymptomLookupView.as_view(), name="ai-symptom-lookup"),

    # Soil Health Card OCR & Review
    path("soil-report/", views.ParseSoilReportView.as_view(), name="soil-report"),
    path("parse-soil-report/", views.ParseSoilReportView.as_view(), name="ai-parse-soil-report"),
    path("soil-report/confirm/", views.ConfirmSoilReportView.as_view(), name="soil-report-confirm"),

    # History
    path("history/", views.AIHistoryView.as_view(), name="ai-history"),
]
