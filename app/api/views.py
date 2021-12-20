from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from app.models import Inventory, User
from .serializers import InventorySerializer
from rest_framework.decorators import api_view

permission_classes = [permissions.IsAuthenticated]

"""
    getInventory():
        retrieve list of userInventory

    addToInventory(elementId, amount):
        add [x] amount of elements to userInventory

    deleteElements(elementId, amount):
        find all elements with matching elementId
        delete [x] elements with matching elementId
"""

   # add permission to check if user is authenticated

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
    serializer = InventorySerializer(instance=inventory, data=request.data, many=True)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response('Nope')

    return Response(serializer.data)
    

# @api_view(['POST'])
# def add_to_inventory(request, pk):
#     itemToAdd = Inventory.objects.bulk_create({"playerId": pk, "elementId": request.data.elementId})
#     serializer = InventorySerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def update_inventory(request, pk):
	task = Inventory.objects.get(id=pk)
	serializer = InventorySerializer(instance=task, data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data) 


@api_view(['DELETE'])
def inventory_delete(request, pk):
	item = Inventory.objects.get(id=pk)
	item.delete()

	return Response('Item succsesfully delete!')