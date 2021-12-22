from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.forms import ModelForm
from django.forms.widgets import EmailInput, PasswordInput

from .models import Player

# Create your forms here.

class RegisterForm(ModelForm):
	username = forms.CharField(max_length=100)
	password = forms.CharField(widget=PasswordInput)
	email = forms.CharField(widget=EmailInput)

	class Meta:
		model = User
		fields = ["username", "email", "password"]

	def save(self, commit=True):
		user = super(RegisterForm, self).save(commit=False)
		user.email = self.cleaned_data['email']
		if commit:
			user.save()
		return user

	
	
