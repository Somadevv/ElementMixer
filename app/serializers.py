from django.contrib.auth.models import User
from rest_framework import serializers
# from . import models


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['userId', 'username', 'email', 'password',
                  'credits', 'alchemyPoints', 'currentTier']


class InventorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        # model = models.Inventory
        fields = ['userId', 'itemId']



class ElementsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        # model = models.Elements
        fields = ['itemId', 'name']

