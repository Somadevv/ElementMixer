from typing import Counter
from django.shortcuts import render, redirect
from app.api.views import get_user
from .forms import RegisterForm
from django.contrib.auth import login
from django.contrib import messages
from rest_framework.response import Response
from .models import Inventory, Player, User


def register_request(request, backend='django.contrib.auth.backends.ModelBackend'):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            messages.success(request, "Registration successful.")
            return redirect('index/')
        messages.error(
            request, "Unsuccessful registration. Invalid information.")
    form = RegisterForm()
    return render(request=request, template_name="home/register.html", context={"register_form": form})


def index(request):
    if request.session.session_key:
        player = Player.objects.get(playerId=request.user)
        inventory = Inventory.objects.filter(playerId=player)
        print(inventory)
        
    
        return render(request, 'home/index.html', {"inventory": inventory, "player": player})
    return render(request, 'home/index.html')

    # data = Inventory.objects.get(pk=current_user.id)
    # inventory = {x: data.elements.count(x) for x in data.elements}
    # print(inventory)
    #  {'user': current_user, "inventory": inventory}
    # if element id exists already, increment amount++
