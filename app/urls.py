from django.urls import include, path
from django.conf.urls import url
from rest_framework import routers
from django.contrib.auth import views as auth_views

# from app.models import Inventory
# from app.views import UserViewSet, ElementsViewSet, InventoryViewSet, add_to_inventory, delete_from_inventory, index, register_request, get_inventory
from app.views import *


urlpatterns = [
    path('api/', include('app.api.urls')),
    path('', index, name='app'),
    path('register/index/', index, name='app'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path("register/", register_request, name="register"),
    path('accounts/', include('allauth.urls')),
    path('change-password/', auth_views.PasswordChangeView.as_view()),
    path('game/', game_view, name='game'),
    path('checkout/', checkout, name='checkout'),
    path('success/', success, name='success'),
    path('failed/', failed, name='failed'),
]
