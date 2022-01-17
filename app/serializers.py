from importlib.metadata import requires
from django.contrib.auth.models import User
from rest_framework import serializers
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['userId', 'username', 'email', 'password',
                  'credits', 'alchemyPoints', 'currentTier']


class PlayerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Inventory
        fields = ["playerId", "credits", "AP", "playerTier"]


class ElementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Elements
        fields = ['elementId','name']


class InventorySerializer(serializers.HyperlinkedModelSerializer):
    name = ElementsSerializer(many=True, read_only=True)

    class Meta:
        model = models.Inventory
        fields = ['playerId', 'elementId', 'name', 'amount']
        extra_kwargs = {'playerId': {'required': False}, 'elementId': {'required': True}, 'name': {'required': False}, 'amount': {'required': False}}



class RecipesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Recipes
        fields = ["recipe", "combination", "name", "discovered"]

