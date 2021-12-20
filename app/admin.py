from django.contrib import admin

from .models import Elements, User, Inventory, Player

admin.site.register(User),
admin.site.register(Player),
admin.site.register(Elements),
admin.site.register(Inventory),




