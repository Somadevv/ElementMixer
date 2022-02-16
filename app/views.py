from typing import Counter
from django.shortcuts import render, redirect
from .forms import RegisterForm
from django.contrib.auth import login
from django.contrib import messages
from rest_framework.response import Response
from .models import Elements, Inventory, Player, User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.decorators import login_required


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

@login_required
def game_view(request):
    player = Player.objects.get(playerId=request.user)    
    Inventory.objects.filter(playerId=player, amount=0).all().delete()
    if request.session.session_key:
        player = Player.objects.get(playerId=request.user)
        inventory = Inventory.objects.filter(playerId=player)
        return render(request, 'game/index.html', {"inventory": inventory, "player": player})

    return render(request, 'game/index.html')


def index(request):
    return render(request, 'home/index.html')
