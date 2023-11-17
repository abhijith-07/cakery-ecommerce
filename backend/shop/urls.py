from django.urls.conf import path
from . import views

urlpatterns = [
    path('', views.IndexView.as_view()),
    path('products/', views.CategoryView.as_view(), name='products'),
    path('items/<str:id>', views.ItemView.as_view(), name='items'),
]
