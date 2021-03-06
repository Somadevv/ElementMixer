from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from django.conf import settings    
from django.conf.urls.static import static


urlpatterns = [
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', admin.site.urls),
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('', include('app.urls')),
    path('register/', include('allauth.urls')),
    path('app/', include('app.urls')),
    # re_path('^', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)