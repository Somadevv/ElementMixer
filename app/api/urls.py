from django.urls import path
from . import views


urlpatterns = [
    path('list-all', views.list_all_inventories, name="list-all-inventories"),
    path('get-inventory/<str:pk>/', views.get_inventory, name="inventory-list"),
    path('add-inventory/<str:pk>/',
         views.add_to_inventory, name="add-to-inventory"),

    path('update-inventory/<str:pk>/',
         views.update_inventory, name="update-inventory"),

    path('delete-inventory/<str:pk>/', views.inventory_delete,
         name="delete-from-inventory"),
    path('get-user/<str:pk>/', views.get_user,
         name="get-user"),
    path('get-elements/1', views.get_elements)
]
