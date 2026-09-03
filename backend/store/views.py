from django.db.models import Q
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from store.models import Category, Product
from store.serializers import CategorySerializer, OrderSerializer, ProductSerializer


class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all().prefetch_related("products")
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class ProductListAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = Product.objects.filter(is_active=True).select_related("category")
        category_slug = self.request.query_params.get("category")
        search_query = self.request.query_params.get("q")
        sort_by = self.request.query_params.get("sort")

        if category_slug and category_slug != "all":
            qs = qs.filter(category__slug=category_slug)

        if search_query:
            qs = qs.filter(
                Q(name__icontains=search_query)
                | Q(sku__icontains=search_query)
                | Q(category__name__icontains=search_query)
            )

        if sort_by == "price_asc":
            qs = qs.order_by("price")
        elif sort_by == "price_desc":
            qs = qs.order_by("-price")
        else:
            qs = qs.order_by("-created_at")

        return qs


class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True).select_related("category")
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "id"
