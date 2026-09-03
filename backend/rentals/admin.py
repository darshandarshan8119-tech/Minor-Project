from django.contrib import admin

from rentals.models import Booking, Equipment, MaintenanceLog

admin.site.register(Equipment)
admin.site.register(Booking)
admin.site.register(MaintenanceLog)
