from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from app.models import Elements, Inventory, User
from .serializers import InventorySerializer, UserSerializer, ElementsSerializer
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt

# permission_classes = [permissions.IsAuthenticated]
"""
INVENTORY API ENDPOINTS
"""

@api_view(['GET'])
def get_elements(request):
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
def add_to_inventory(request, pk, elementId, amount):
    inventory = Inventory.objects.filter(playerId=pk)
    serializer = InventorySerializer(instance=inventory, data=request.data, many=True)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.data)


@api_view(['POST'])
def update_inventory(request, pk):
    task = Inventory.objects.get(id=pk)
    serializer = InventorySerializer(instance=task, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(f'Succsesfully Updated: {request.data}')

    return Response(task) 


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





