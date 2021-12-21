from django.shortcuts import render, redirect
from .forms import NewUserForm
from django.contrib.auth import login
from django.contrib import messages
from rest_framework import permissions, serializers
from rest_framework.mixins import (
    CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin
)
from rest_framework.viewsets import GenericViewSet
from .models import User, Elements, Inventory
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from app.serializers import InventorySerializer, UserSerializer, ElementsSerializer

import sqlite3
conn = sqlite3.connect('elementMixer.db')
c = conn.cursor()

@api_view(['POST'])
def add_to_inventory(request):
    if request.method == 'POST':
        data = {
            'userId': request.data.get('userId'),
            'itemId': request.data.get('itemId'),
            'credits': request.data.get('credits'),
            'alchemyPoints': request.data.get('alchemyPoints'),
            'currentTier': request.data.get('currentTier'),
        }
        serializer = InventorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_from_inventory(request):
    # delete a single inventoryItem
    if request.method == 'DELETE':
        Inventory.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



def index(request):
    return render(request, 'home/index.html')


# class UserViewSet(GenericViewSet,  # generic view functionality
#                   CreateModelMixin,  # handles POSTs
#                   RetrieveModelMixin,  # handles GETs for 1 Company
#                   UpdateModelMixin,  # handles PUTs and PATCHes
#                   ListModelMixin):  # handles GETs for many Companies

#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = UserSerializer
#     queryset = User.objects.all()


# class InventoryViewSet(GenericViewSet,  # generic view functionality
#                        CreateModelMixin,  # handles POSTs
#                        RetrieveModelMixin,  # handles GETs for 1 Company
#                        UpdateModelMixin,  # handles PUTs and PATCHes
#                        ListModelMixin):

#     serializer_class = InventorySerializer
#     queryset = Inventory.objects.all()


# class ElementsViewSet(GenericViewSet,  # generic view functionality
#                       CreateModelMixin,  # handles POSTs
#                       RetrieveModelMixin,  # handles GETs for 1 Company
#                       UpdateModelMixin,  # handles PUTs and PATCHes
#                       ListModelMixin):  # handles GETs for many Companies

#     serializer_class = ElementsSerializer
#     queryset = Elements.objects.all()


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



