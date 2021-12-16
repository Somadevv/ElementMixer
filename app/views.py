from django.shortcuts import render, redirect
from .forms import NewUserForm
from django.contrib.auth import login
from django.contrib import messages
from rest_framework import permissions, serializers
from rest_framework.mixins import (
    CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin
)
from rest_framework.viewsets import GenericViewSet
from .models import User, UserInventory, Inventory
from .serializers import UserSerializer, UserInventorySerializer, InventorySerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User, Inventory, UserInventory
from .serializers import InventorySerializer, UserSerializer, UserInventorySerializer

# SQLITE3
import sqlite3
conn = sqlite3.connect('elements.db', check_same_thread=False)


def return_elements():
    c = conn.cursor()
    c.execute("SELECT itemId, elementName FROM elements")
    conn.commit()
    return c.fetchall(), c.close()


@api_view(['GET', 'DELETE', 'PUT'])
def get_delete_update_userinventory(request, pk):
    try:
        inventory = UserInventory.objects.get(pk=pk)
    except UserInventory.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # get details of a single inventoryItem
    if request.method == 'GET':
        # serializer = UserInventorySerializer(inventory)
        return Response(return_elements())

    # delete a single inventory
    # update details of a single inventoryItem
    if request.method == 'PUT':
        serializer = UserInventorySerializer(Inventory, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # delete a single inventoryItem
    if request.method == 'DELETE':
        Inventory.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def get_post_userinventory(request):
    # get all puppies
    if request.method == 'GET':
        inventory = Inventory.objects.all()
        serializer = InventorySerializer(inventory, many=True)
        return Response(serializer.data)
    # insert a new record for a inventoryItem
    elif request.method == 'POST':
        data = {
            'userId': request.data.get('userId'),
            'itemId': request.data.get('itemId'),
            'credits': request.data.get('credits'),
            'alchemyPoints': request.data.get('alchemyPoints'),
            'currentTier': request.data.get('currentTier'),
        }
        serializer = UserInventorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# conn = sqlite3.connect("tutorial2.db")

# def create_table():
#     c = conn.cursor()
#     c.execute('CREATE TABLE IF NOT EXISTS stuffToPlot (unix REAL, datestamp TEXT, keyword TEXT, value REAL)')
#     c.close()

# def data_entry():
#     c = conn.cursor()
#     c.execute("INSERT INTO stuffToPlot VALUES (145123542, '2016-01-03', 'Python', 7)")
#     conn.commit()
#     c.close()


def index(request):
    return render(request, 'home/index.html')


class UserViewSet(GenericViewSet,  # generic view functionality
                  CreateModelMixin,  # handles POSTs
                  RetrieveModelMixin,  # handles GETs for 1 Company
                  UpdateModelMixin,  # handles PUTs and PATCHes
                  ListModelMixin):  # handles GETs for many Companies

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
    queryset = User.objects.all()


class InventoryViewSet(GenericViewSet,  # generic view functionality
                       CreateModelMixin,  # handles POSTs
                       RetrieveModelMixin,  # handles GETs for 1 Company
                       UpdateModelMixin,  # handles PUTs and PATCHes
                       ListModelMixin):  # handles GETs for many Companies

    serializer_class = UserInventorySerializer
    queryset = Inventory.objects.all()


class UserInventoryViewSet(GenericViewSet,  # generic view functionality
                           CreateModelMixin,  # handles POSTs
                           RetrieveModelMixin,  # handles GETs for 1 Company
                           UpdateModelMixin,  # handles PUTs and PATCHes
                           ListModelMixin):  # handles GETs for many Companies

    serializer_class = InventorySerializer
    queryset = UserInventory.objects.all()


# class PlayerViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows players to be viewed
#     """
#     queryset = Player.objects.all()
#     serializer_class = PlayerSerializer
#     permission_classes = [permissions.IsAuthenticated]


def register_request(request):
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Registration successful.")
            return redirect("main:homepage")
        messages.error(
            request, "Unsuccessful registration. Invalid information.")
    form = NewUserForm()
    return render(request=request, template_name="signup.html", context={"register_form": form})
