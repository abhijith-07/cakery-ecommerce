import json
from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from .models import Item, Category, Gallery, OrderItem


class IndexView(View):
    template = "shop/index.html"

    def get(self, request, *args, **kwargs):
        gallery = Gallery.objects.all()
        products = Category.objects.all()
        context = {'galleries':gallery, 'products':products}
        return render(request, self.template, context=context)  

class CategoryView(View):
    template = "shop/category.html"

    def get(self, request, *args, **kwargs):
        categories = Category.objects.all()
        return render(request, self.template, {'categories': categories})

class ItemView(View):
    template = "shop/items.html"

    def get(self, request, id, *args, **kwargs):
        category = Category.objects.get(id=id)
        items = Item.objects.filter(category=category)
        return render(request, self.template, {'items':items, 'category':category})

class CartView(View):
    template = "shop/cart.html"

    def get(self, request, *args, **kwargs):
        cart = OrderItem.objects.all()
        return render(request, self.template, {'cart': cart})
    
    def put(self, request, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        order_item = OrderItem.objects.get(id=data["id"])
        order_item.quantity = data["quantity"]
        order_item.save()
        data = {
            'id': order_item.id,
            'quantity': order_item.quantity,
            'price': order_item.get_total_price
        }
        return JsonResponse(data)
    
    def delete(self, request, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        delete_order_item = OrderItem.objects.get(id=data['id'])
        delete_order_item.delete()
        return JsonResponse({'deletedId': data['id']})