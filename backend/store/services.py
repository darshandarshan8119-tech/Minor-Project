import uuid
from decimal import Decimal

from django.db import transaction

from common.idempotency import reserve_idempotency_key
from common.outbox import enqueue_event
from store.models import InventoryLedger, Order, OrderItem, Payment, Product


class InsufficientStock(Exception):
    pass


def create_order(*, user, items: list[dict], delivery_address: dict, idempotency_key: str) -> Order:
    idem = reserve_idempotency_key(
        "store.order.create",
        idempotency_key,
        {"items": items, "delivery_address": delivery_address, "user_id": str(user.id)},
    )

    with transaction.atomic():
        skus = sorted(item["sku"] for item in items)
        products = {
            product.sku: product
            for product in Product.objects.select_for_update().filter(sku__in=skus, is_active=True).order_by("sku")
        }
        total = Decimal("0")
        order = Order.objects.create(
            user=user,
            order_number=f"AM-{uuid.uuid4().hex[:12].upper()}",
            total_amount=0,
            idempotency_key=idem.id,
            delivery_address_json=delivery_address,
        )

        for item in items:
            product = products[item["sku"]]
            quantity = int(item["quantity"])
            if product.available_quantity < quantity:
                raise InsufficientStock(f"Insufficient stock for SKU {product.sku}")

            line_total = product.price * quantity
            total += line_total
            product.reserved_quantity += quantity
            product.save(update_fields=["reserved_quantity", "updated_at"])
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                unit_price=product.price,
                line_total=line_total,
            )
            InventoryLedger.objects.create(
                product=product,
                delta_quantity=-quantity,
                reason=InventoryLedger.Reason.RESERVATION,
                reference_type="store_order",
                reference_id=order.id,
            )

        order.total_amount = total
        order.save(update_fields=["total_amount", "updated_at"])
        Payment.objects.create(
            order=order,
            provider="manual",
            provider_payment_id=f"created-{order.id}",
            amount=total,
            currency=order.currency,
        )
        enqueue_event("order.created", "store_order", order.id, {"order_id": str(order.id), "total": str(total)})
        return order
