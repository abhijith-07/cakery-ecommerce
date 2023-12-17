from django.db import models
from django.contrib.auth.models import User
import os
from django.conf import settings

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    full_name = models.CharField(max_length=300)
    email = models.EmailField()

    def __str__(self) -> str:
        return self.user.username

def path_to_category_image(instance, filename):
    return f"category/{instance.name}/{filename}"

class Category(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to=path_to_category_image)

    def __str__(self) -> str:
        return self.name

def path_to_image(instance, filename):
    return f"items/{instance.category}/{filename}"

class Item(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True, default=None)
    price = models.FloatField()
    image = models.ImageField(upload_to=path_to_image)

    def __str__(self) -> str:
        return self.name
    

class OrderItem(models.Model):
    item = models.ForeignKey(Item, on_delete=models.SET_NULL, blank=True, null=True)
    quantity = models.IntegerField(default=0)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.item.name

    @property
    def get_total_price(self):
        total_price = self.item.price * self.quantity
        return total_price
    
class Order(models.Model):
    customer = models.ForeignKey(Customer,on_delete=models.SET_NULL, blank=True, null=True)
    items = models.ManyToManyField(OrderItem)
    complete = models.BooleanField(default=False)
    ordered_at = models.DateTimeField(auto_now_add=True)
    transaction_id = models.CharField(max_length=200, null=True)

    def __str__(self) -> str:
        return f"Order: {self.transaction_id}"

class ShippingAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, blank=True, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, blank=True, null=True)
    address = models.TextField()
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    pincode = models.CharField(max_length=200)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.address

class Gallery(models.Model):
    header_line = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    image = models.ImageField(upload_to='gallery/')

    def __str__(self) -> str:
        return self.header_line
    
    def save(self, *args, **kwargs):
        # Ensure the directory exists before saving the image
        new_directory = os.path.join(settings.MEDIA_ROOT, 'gallery')
        if not os.path.exists(new_directory):
            os.makedirs(new_directory)

        super().save(*args, **kwargs)