from django.urls import path
from . import views
from ..views import index


urlpatterns = [
    path('get-inventory/<str:pk>/', views.get_inventory, name="inventory-list"),
    path('add-inventory/<str:pk>/',
         views.add_to_inventory, name="add-to-inventory"),

    path('update-inventory/<str:pk>/',
         views.update_inventory, name="update-inventory"),

    path('delete-inventory/<str:pk>/', views.inventory_delete,
         name="delete-from-inventory"),
    path('list-elements', views.list_elements),
    path('check-elements', views.check_elements),
]
