from django.shortcuts import render, redirect
from app.api.views import get_user
from .forms import RegisterForm
from django.contrib.auth import login
from django.contrib import messages
from rest_framework.response import Response
from .models import Inventory


def register_request(request, backend='django.contrib.auth.backends.ModelBackend'):
	if request.method == "POST":
		form = RegisterForm(request.POST)
		if form.is_valid():
			user = form.save()
			login(request, user, backend='django.contrib.auth.backends.ModelBackend')
			messages.success(request, "Registration successful." )
			return redirect('index.html')
		messages.error(request, "Unsuccessful registration. Invalid information.")
	form = RegisterForm()
	return render(request=request, template_name="home/register.html", context={"register_form":form})


def index(request):
    userId = request.user.id
    return render(request, 'home/index.html')




