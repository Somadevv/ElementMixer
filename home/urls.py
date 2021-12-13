from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'players', views.PlayerViewSet, basename='players')


urlpatterns = [
    path('', views.index, name='home'),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path("register/", views.register_request, name="register")
]
