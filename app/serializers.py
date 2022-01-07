from django.contrib.auth.models import User
from rest_framework import serializers
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['userId', 'username', 'email', 'password',
                  'credits', 'alchemyPoints', 'currentTier']

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Inventory
        fields = ["playerId", "credits", "AP", "playerTier"]



class ElementsSerializer(serializers.ModelSerializer):
    class Meta:
      model = models.Elements
      fields = ['elementId', 'name', 'elementTier']
      
class InventorySerializer(serializers.ModelSerializer):
  name = ElementsSerializer(many=True, read_only=True)
   
  class Meta:
    model = models.Inventory
    fields = ['playerId', 'elementName', 'amount']



