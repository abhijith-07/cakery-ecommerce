from django.contrib import admin
from .models import Customer, Category, Item, OrderItem, Order, Gallery

admin.site.register(Customer)
admin.site.register(Category)
admin.site.register(Item)
admin.site.register(OrderItem)
admin.site.register(Order)
admin.site.register(Gallery)