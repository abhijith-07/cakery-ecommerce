from django.urls.conf import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'items', views.ItemViewSet, basename='item')
urlpatterns = router.urls
