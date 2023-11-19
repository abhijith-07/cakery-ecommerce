from django.shortcuts import render
from django.views import View
from .models import Item, Category, Gallery


class IndexView(View):
    template = "shop/index.html"

    def get(self, request, *args, **kwargs):
        gallery = Gallery.objects.all()
        context = {'galleries':gallery}
        return render(request, self.template, {'galleries':gallery})  

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
