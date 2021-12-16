from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from django.conf import settings    
from django.conf.urls.static import static
from app.views import InventoryViewSet, ElementsViewSet, UserViewSet

router = DefaultRouter()
router.register(r'users', ElementsViewSet)
router.register(r'users', InventoryViewSet)
router.register(r'users', UserViewSet)


urlpatterns = [
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', admin.site.urls),
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('', include('app.urls')),
    path('register/', include('allauth.urls')),
    re_path('^', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)