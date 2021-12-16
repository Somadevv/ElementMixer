from django.contrib import admin
from .models import Inventory, Elements, User


admin.site.register(User)
admin.site.register(Elements)
admin.site.register(Inventory)


