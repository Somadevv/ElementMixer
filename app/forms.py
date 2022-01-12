from django import forms
from django.contrib.auth.models import User
from django.forms import ModelForm
from django.forms.widgets import EmailInput, PasswordInput

from .models import Inventory

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

class UpdateInventoryForm(ModelForm):
	class Meta:
		model = Inventory
		fields = '__all__'

	
	
