from django.urls import include, path
from django.conf.urls import url
from rest_framework import routers
# from app.models import Inventory
# from app.views import UserViewSet, ElementsViewSet, InventoryViewSet, add_to_inventory, delete_from_inventory, index, register_request, get_inventory
from app.views import index


# router = routers.DefaultRouter()
# router.register(r'api/users', UserViewSet, basename='users')
# router.register(r'api/elements', ElementsViewSet, basename='elements')
# router.register(r'api/getinventory', InventoryViewSet, basename='inventory')


urlpatterns = [
    # CHECK THIS ->
    path('api/', include('app.api.urls')),
    
    # url(r'^api/removefrominventory',
    #     delete_from_inventory, name='removeFromInventory'),

    path('', index, name='app'),
    # path('', include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # path("register/", register_request, name="register")
]
