from rest_framework import serializers

from store.models import Category, Order, OrderItem, Product


class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.IntegerField(source="products.count", read_only=True)

    class Meta:
        model = Category
        fields = ["id", "slug", "name", "icon", "description", "product_count"]


class ProductSerializer(serializers.ModelSerializer):
    category_slug = serializers.CharField(source="category.slug", read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)
    available_quantity = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "category",
            "category_slug",
            "category_name",
            "sku",
            "name",
            "price",
            "stock_quantity",
            "available_quantity",
            "lab_germination_pct",
            "purity_rating",
            "specifications_json",
            "is_active",
            "created_at",
        ]


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "product", "product_name", "quantity", "unit_price", "tax_amount", "line_total"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "order_number",
            "total_amount",
            "currency",
            "order_status",
            "payment_status",
            "idempotency_key",
            "delivery_address_json",
            "items",
            "created_at",
        ]
        read_only_fields = ["id", "order_number", "order_status", "payment_status", "created_at"]
