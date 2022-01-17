
from re import X
from xml.dom.minidom import TypeInfo
from rest_framework.response import Response
from rest_framework import status
from app.models import Elements, Inventory, Recipes, User, Player
from .serializers import InventorySerializer, UserSerializer, ElementsSerializer
from rest_framework.decorators import api_view
from django.db.models import F
import json
from django.db import transaction

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
def check_elements(request):
    data = json.loads(request.data["combination"])
    data.sort()
    query = Recipes.objects.filter(combination=data).values('name')
    
    if query:
        player = Player.objects.get(playerId=request.user)
        elementInstance = Elements.objects.get(name=query[0]["name"])
        Inventory.objects.create(playerId=player, name=elementInstance, amount=1)
        print(f"User found element: ", query[0]["name"])
        return Response(query[0]["name"], status=status.HTTP_200_OK)
    else:
        print("no")
    return Response("Comination was unsuccessful")
    


@api_view(['POST'])
def update_inventory(request, pk):
    player = Player.objects.get(playerId=request.user)
    if player:
        requestExists = Inventory.objects.filter(
            playerId=player, name=request.data["name"])

        if requestExists:
            requestExists.update(amount=F('amount')+request.data["amount"])
            Inventory.objects.get(playerId=player, name=request.data["name"])
            print("yes")
        else:
            elementInstance = Elements.objects.get(name=request.data["name"])
            Inventory.objects.create(
                playerId=player, name=elementInstance, amount=request.data["amount"])

        return Response(f'Succsesfully Updated: {request.data}')
    else:
        Response(f'Failed to update: {request.data}, is not valid.')


@api_view(['DELETE', 'POST'])
def inventory_delete(request, pk):
    item = Inventory.objects.get(id=pk)
    item.delete()
    return Response('Item succsesfully deleted!')

