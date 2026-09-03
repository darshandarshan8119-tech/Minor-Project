from django.contrib import admin

from store.models import Category, InventoryLedger, Order, OrderItem, Payment, Product

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Payment)
admin.site.register(InventoryLedger)
