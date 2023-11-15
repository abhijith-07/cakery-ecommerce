from django.shortcuts import render
from django.views import View
from .models import Item

class IndexView(View):
    template = "shop/index.html"

    def get(self, request, *args, **kwargs):
        items = Item.objects.all()
        return render(request, self.template, {'items':items})        
