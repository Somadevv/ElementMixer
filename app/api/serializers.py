from rest_framework import serializers
from app.models import Elements, Inventory, User, Player

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
        fields = ["elementId", "name", "elementTier"]


class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = ["playerId", "name", "amount"]


