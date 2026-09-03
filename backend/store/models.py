from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models

from common.models import TimeStampedModel, UUIDPrimaryKeyModel


class Category(UUIDPrimaryKeyModel):
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=120)
    icon = models.CharField(max_length=80, blank=True)
    description = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.name


class Product(UUIDPrimaryKeyModel, TimeStampedModel):
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="products")
    sku = models.CharField(max_length=80, unique=True)
    name = models.CharField(max_length=180)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    stock_quantity = models.PositiveIntegerField(default=0)
    reserved_quantity = models.PositiveIntegerField(default=0)
    lab_germination_pct = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    purity_rating = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    specifications_json = models.JSONField(default=dict, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        indexes = [models.Index(fields=["category", "is_active"])]
        constraints = [
            models.CheckConstraint(condition=models.Q(stock_quantity__gte=models.F("reserved_quantity")), name="stock_gte_reserved"),
        ]

    @property
    def available_quantity(self) -> int:
        return self.stock_quantity - self.reserved_quantity

    def __str__(self) -> str:
        return f"{self.sku} - {self.name}"


class Order(UUIDPrimaryKeyModel, TimeStampedModel):
    class OrderStatus(models.TextChoices):
        DRAFT = "draft", "Draft"
        PLACED = "placed", "Placed"
        PACKED = "packed", "Packed"
        SHIPPED = "shipped", "Shipped"
        DELIVERED = "delivered", "Delivered"
        CANCELLED = "cancelled", "Cancelled"

    class PaymentStatus(models.TextChoices):
        PENDING = "pending", "Pending"
        AUTHORIZED = "authorized", "Authorized"
        PAID = "paid", "Paid"
        FAILED = "failed", "Failed"
        REFUNDED = "refunded", "Refunded"
        DISPUTED = "disputed", "Disputed"

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="orders")
    order_number = models.CharField(max_length=40, unique=True)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(0)])
    currency = models.CharField(max_length=3, default="INR")
    order_status = models.CharField(max_length=20, choices=OrderStatus.choices, default=OrderStatus.PLACED)
    payment_status = models.CharField(max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)
    idempotency_key = models.UUIDField(unique=True)
    delivery_address_json = models.JSONField(default=dict)

    class Meta:
        indexes = [models.Index(fields=["user", "-created_at"])]


class OrderItem(UUIDPrimaryKeyModel):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    line_total = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(0)])


class Payment(UUIDPrimaryKeyModel, TimeStampedModel):
    class Status(models.TextChoices):
        CREATED = "created", "Created"
        AUTHORIZED = "authorized", "Authorized"
        CAPTURED = "captured", "Captured"
        FAILED = "failed", "Failed"
        REFUNDED = "refunded", "Refunded"
        DISPUTED = "disputed", "Disputed"

    order = models.ForeignKey(Order, on_delete=models.PROTECT, related_name="payments")
    provider = models.CharField(max_length=40)
    provider_payment_id = models.CharField(max_length=120, unique=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(0)])
    currency = models.CharField(max_length=3, default="INR")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.CREATED)
    raw_webhook_json = models.JSONField(default=dict, blank=True)


class InventoryLedger(UUIDPrimaryKeyModel):
    class Reason(models.TextChoices):
        PURCHASE = "purchase", "Purchase"
        RESERVATION = "reservation", "Reservation"
        RELEASE = "release", "Release"
        SALE = "sale", "Sale"
        REFUND = "refund", "Refund"
        MANUAL_ADJUSTMENT = "manual_adjustment", "Manual adjustment"

    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name="inventory_ledger")
    delta_quantity = models.IntegerField()
    reason = models.CharField(max_length=40, choices=Reason.choices)
    reference_type = models.CharField(max_length=80)
    reference_id = models.UUIDField()
    created_at = models.DateTimeField(auto_now_add=True)
