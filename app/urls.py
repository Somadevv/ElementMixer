from django.urls import include, path
from django.conf.urls import url
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, basename='users')
router.register(r'inventory', views.InventoryViewSet, basename='inventory')
router.register(r'userIventory', views.UserInventoryViewSet,
                basename='user inventory')



urlpatterns = [
    url(r'^api/getInventory/(?P<pk>[0-9]+)$',
        views.get_delete_update_userinventory, name='get_delete_update_userinventory'),
    url(r'^api/v1/userinventory/$', views.get_post_userinventory, name='get_post_userinventory'),
    path('', views.index, name='app'),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path("register/", views.register_request, name="register")
]
