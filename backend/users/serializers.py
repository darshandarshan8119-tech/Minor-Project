from rest_framework import serializers
from users.models import CustomUser, FarmerProfile, MerchantProfile


class FarmerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmerProfile
        fields = ["farm_acreage", "soil_type", "irrigation_type", "kisan_card_number_last4"]


class MerchantProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MerchantProfile
        fields = ["company_name", "apmc_license_no", "gst_number_last4", "credit_limit", "risk_status"]


class UserSerializer(serializers.ModelSerializer):
    farmer_profile = FarmerProfileSerializer(read_only=True)
    merchant_profile = MerchantProfileSerializer(read_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "phone",
            "email",
            "role",
            "full_name",
            "village_pincode",
            "is_verified",
            "farmer_profile",
            "merchant_profile",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField(help_text="Phone number or email address")
    password = serializers.CharField(required=False, allow_blank=True, write_only=True)
    role = serializers.ChoiceField(choices=CustomUser.Role.choices, required=False)
