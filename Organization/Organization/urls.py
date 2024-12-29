
from django.contrib import admin
from django.urls import path, include
import OrganizationApp.urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(OrganizationApp.urls))
]
