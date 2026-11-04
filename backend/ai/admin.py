from django.contrib import admin

from ai.models import CropRecommendationRecord, CropScan, SoilReport

admin.site.register(SoilReport)
admin.site.register(CropRecommendationRecord)
admin.site.register(CropScan)
