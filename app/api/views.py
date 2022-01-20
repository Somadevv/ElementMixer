
from email import utils
from itertools import combinations
from re import X
from xml.dom.minidom import TypeInfo
from rest_framework.response import Response
from rest_framework import status
from app.models import Elements, Inventory, Recipes, User, Player
from .serializers import InventorySerializer, PlayerSerializer, UserSerializer, ElementsSerializer
from rest_framework.decorators import api_view
from django.db.models import F
import json
from django.db import transaction
from django.http import JsonResponse
from django_postgres_extensions.models.functions import ArrayAppend


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


@api_view(['GET'])
def get_credits(request, pk):
    player = Player.objects.filter(playerId=pk)
    serializer = PlayerSerializer(player, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Add recipe reward to player AP

# if player discovers new recipe, get the recipe id, and append to player's recipe history

# players recipe history will look like -> [1, 2, 3, 4, 5]


"""
[CLIENT]
> when blend is clicked <
send combination to server -> server checks combination

if response === new recipe:

if (response.includes(newElement)) {
    return the normal discovery screen
} else {
    return new discovery screen
}

['Lava', 'Wheat]




[SERVER]
remove combination from inventory
check request combination to see if it matches a recipe

if it does match a recipe:
    check if player has recipe discovered 
    if they do:

        update element + 1
        return Response("[Element] added to inventory")
    else:
        add to player discovered history
        give player the new element
        return Response("Player found [Element]!")

check if player has element discovered in inventory
if they do:
    
"""

def delete_records_with_amount_zero(player):
    return Inventory.objects.filter(playerId=player, amount=0).all().delete()


@api_view(['POST'])
def check_elements(request):
    # stores the request combination as data
    data = json.loads(request.data["combination"])
    # query the Recipes table to check if the data matches an existing Recipe.
    query = Recipes.objects.filter(combination=data).values('name')
    # create user instance
    user = User.objects.get(username=request.user)
    # create player instance
    player = Player.objects.get(playerId=request.user)
    # check for any Inventory recors with a field amount of 0 & delete.
    delete_records_with_amount_zero(player)
    

    for i in data:
        # Deletes combination query from player invnentory
        Inventory.objects.filter(playerId=player, eleId=i).update(
            amount=F('amount') - 1)
        delete_records_with_amount_zero(player)

    if query:
        # if the data received from the request matches a Recipe ->
        delete_records_with_amount_zero(player)
        inventory = Inventory.objects.filter(
            playerId=player, name=query[0]["name"])
        elementInstance = Elements.objects.get(name=query[0]["name"])
        hasRecipe = Player.objects.filter(
            playerId=request.user).values('recipes')
        reward = Recipes.objects.filter(combination=data).values('reward')

        if query[0]["name"] in hasRecipe[0]["recipes"]:
            # If the query name exists in the player's recipes field ->
            delete_records_with_amount_zero(player)
            if inventory:
                # if the element found is already inside the users inventory ->
                Inventory.objects.filter(playerId=player, eleId=elementInstance,
                                     name=elementInstance).update(amount=F('amount') + 1)
            else:
                Inventory.objects.create(
                playerId=player, eleId=elementInstance, name=elementInstance, amount=1)
            return JsonResponse({'Found': query[0]["name"]})

        else:
            delete_records_with_amount_zero(player)
            Player.objects.filter(playerId=user).update()
            Inventory.objects.create(
                playerId=player, eleId=elementInstance, name=elementInstance, amount=1)
            Player.objects.update(recipes=ArrayAppend(
                'recipes', query[0]["name"]))
            return JsonResponse({'Discovered': query[0]["name"], 'Reward': reward[0]["reward"]})
    else:
        return Response("No recipe found.")

        # If user has the element in the request data combination result


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
