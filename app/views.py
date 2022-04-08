from typing import Counter
from django.shortcuts import render, redirect
from .forms import RegisterForm
from django.contrib.auth import login
from django.contrib import messages
from rest_framework.response import Response
from .models import Elements, Inventory, Player, User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.decorators import login_required
from django.db.models import F

import os
import stripe


def register_request(request, backend='django.contrib.auth.backends.ModelBackend'):
    air = Elements.objects.get(name="Air")
    fire = Elements.objects.get(name="Fire")
    earth = Elements.objects.get(name="Earth")
    wind = Elements.objects.get(name="Wind")
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user, backend)
            messages.success(request, "Registration successful.")
            player = Player.objects.get(playerId=request.user)
            Inventory.objects.bulk_create(
                [Inventory(playerId=player, eleId=air, name=air, amount=8),
                 Inventory(playerId=player, eleId=fire, name=fire, amount=8),
                 Inventory(playerId=player, eleId=earth, name=earth, amount=8),
                    Inventory(playerId=player, eleId=wind, name=wind, amount=8)]
            )

            return redirect('/game')
        messages.error(
            request, "Unsuccessful registration. Invalid information.")
    form = RegisterForm()
    return render(request=request, template_name="home/register.html", context={"register_form": form})


def checkout(request):
    session = stripe.checkout.Session.create(
        line_items=[{
            'price_data': {
                'currency': 'usd',
                'product_data': {
                    'name': 'Credits',
                },
                'unit_amount': 500,
            },
            'quantity': 1,
        }],
        mode='payment',
        success_url='http://127.0.0.1:8000/success/',
        cancel_url='http://127.0.0.1:8000/failed/',
    )

    return redirect(session.url, code=303)


@login_required
def game_view(request):
    player = Player.objects.get(playerId=request.user)
    Inventory.objects.filter(playerId=player, amount=0).all().delete()
    if request.session.session_key:
        player = Player.objects.get(playerId=request.user)
        inventory = Inventory.objects.filter(playerId=player)
        return render(request, 'game/index.html', {"inventory": inventory, "player": player})

    return render(request, 'game/index.html')


def success(request):
    Player.objects.filter(
        playerId=request.user).update(credits=F('credits') + 300)
    print('User succesfully purchased 300 credits')
    return render(request, 'game/success.html')


def failed(request):
    print('User failed a purchase')
    return render(request, 'game/failed.html')


def index(request):
    return render(request, 'home/index.html')
