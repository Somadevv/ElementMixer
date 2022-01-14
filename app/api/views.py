from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from app.models import Elements, Inventory, User, Player
from .serializers import InventorySerializer, UserSerializer, ElementsSerializer
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from ..forms import UpdateInventoryForm
from django.db import transaction


from app.api import serializers

# permission_classes = [permissions.IsAuthenticated]
"""
INVENTORY API ENDPOINTS
"""


@api_view(['GET'])
def list_elements(request):
    elements = Elements.objects.all()
    serializer = ElementsSerializer(elements, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def list_all_inventories(request):
    inventory = Inventory.objects.all()
    serializer = InventorySerializer(inventory, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_inventory(request, pk):
    inventory = Inventory.objects.filter(playerId=pk)
    serializer = InventorySerializer(inventory, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def add_to_inventory(request, pk):
    inventory = Inventory.objects.filter(playerId=pk)
    serializer = InventorySerializer(
        instance=inventory, data=request.data, many=True)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.data)


@api_view(['POST'])
def update_inventory(request, pk):
    player = Player.objects.get(playerId=request.user)
    if player:
        inventory = Inventory.objects.get(playerId=player, name=request.data["name"])
        if inventory:
            i = inventory
            print('before', i.amount)
            i.amount+= int(request.data["amount"])
            print('after', i.amount)
            
            
            i.save()
            transaction.commit()
            print("Added", request.data["amount"], 'to', request.user,'s', request.data["name"])
        else:
            print("invalid inventory")
    else:
        print("nah")
    serializer = InventorySerializer(instance=inventory, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(f'Succsesfully Updated: {request.data}')
    else:
        return Response(serializer.errors)


@api_view(['DELETE', 'POST'])
def inventory_delete(request, pk):
    item = Inventory.objects.get(id=pk)
    item.delete()

    return Response('Item succsesfully deleted!')


"""
USER API ENDPOINTS
"""


@api_view(['GET'])
def get_user(request, pk):
    user = User.objects.filter(userId=pk)
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)





    
