from .models import Customer, Item, OrderItem, Order, ShippingAddress
from rest_framework import serializers

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'