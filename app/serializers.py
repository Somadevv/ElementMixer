from django.contrib.auth.models import User
from rest_framework import serializers
from app.models import User, Inventory, UserInventory


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
        # extra_kwargs = {
        #     'url': {'view_name': 'user-detail', 'lookup_field': 'id'},
        # }


class InventorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Inventory
        fields = ['itemId', 'elementName']
        # extra_kwargs = {
        #     'url': {'view_name': 'inventory-detail', 'lookup_field': 'id'},
        # }



class UserInventorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserInventory
        fields = ['userId', 'itemId',
                  'credits', 'alchemyPoints', 'currentTier']
        # extra_kwargs = {
        #     'url': {'view_name': 'user-inventory-detail', 'lookup_field': 'id'},
        # }

