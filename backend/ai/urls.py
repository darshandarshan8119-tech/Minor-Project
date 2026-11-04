from django.urls import path

from ai import views

urlpatterns = [
    path("crop-recommend/", views.CropRecommendationView.as_view(), name="ai-crop-recommend"),
    path("parse-soil-report/", views.ParseSoilReportView.as_view(), name="ai-parse-soil-report"),
    path("detect-disease/", views.DiseaseDetectionView.as_view(), name="ai-detect-disease"),
    path("symptom-lookup/", views.SymptomLookupView.as_view(), name="ai-symptom-lookup"),
    path("history/", views.AIHistoryView.as_view(), name="ai-history"),
]
