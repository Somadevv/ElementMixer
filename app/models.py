from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models.base import Model
from django.db.models.deletion import CASCADE


class User(models.Model):
    userId = models.AutoField(primary_key=True)
    username = models.CharField(max_length=16)
    email = models.EmailField(max_length=30)
    
    def __str__(self):
        return str(self.username)


class Player(models.Model):
    playerId = models.ForeignKey(User, on_delete=models.CASCADE)
    credits = models.IntegerField(default=500)
    AP = models.IntegerField(default=100)
    tier = models.IntegerField(default=1)

    def __str__(self):
        return str(self.playerId)


class Elements(models.Model):
    elementId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    elementTier = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)])

    def __str__(self):
        return str(self.name)


class Inventory(models.Model):
    playerId = models.ForeignKey(Player, on_delete=models.CASCADE)
    elementId = models.ForeignKey(Elements, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.playerId)
