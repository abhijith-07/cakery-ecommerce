from django.urls.conf import path
from . import views

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('products/', views.CategoryView.as_view(), name='products'),
    path('items/<str:id>', views.ItemView.as_view(), name='items'),
    path('cart/', views.CartView.as_view(), name='cart'),
]
