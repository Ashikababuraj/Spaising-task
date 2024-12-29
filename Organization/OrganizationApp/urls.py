from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PersonViewset

router = DefaultRouter()
router.register(r'persons', PersonViewset)

urlpatterns = [
    path('api/', include(router.urls)),
]
