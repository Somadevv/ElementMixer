from rest_framework import serializers
from app.models import Elements, Inventory, Recipes, User, Player

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["userId", "username", "email", "isMember"]


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ["playerId", "credits", "AP", "playerTier"]


class ElementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Elements
        fields = ["elementId", "name"]


class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = ["playerId", "elementId", "name", "amount"]


class RecipesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipes
        fields = ["recipe", "combination", "name", "discovered"]




