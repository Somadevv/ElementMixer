from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models.deletion import CASCADE
from django.contrib.postgres.fields import ArrayField


class User(models.Model):
    userId = models.AutoField(primary_key=True)
    username = models.CharField(max_length=16)
    email = models.EmailField(max_length=30)
    isMember = models.BooleanField(default=False)
    class meta:
        db_table = 'app_users'
        app_label = "app"
        managed = True

    def __str__(self):
        return str(self.userId)
        


class Player(models.Model):
    playerId = models.ForeignKey(User, on_delete=models.CASCADE)
    credits = models.IntegerField(default=500)
    AP = models.IntegerField(default=100)
    playerTier = models.IntegerField(default=1)
    class meta:
        db_table = 'app_players'
        app_label = "app"
        managed = True

    def __str__(self):
        return str(self.playerId)
        


class Elements(models.Model):
    elementId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    elementTier = models.IntegerField(
    validators=[MinValueValidator(1), MaxValueValidator(5)])
    value = models.IntegerField()
    class meta:
        db_table = 'app_elements'
        app_label = "app"
        managed = True

    def __str__(self):
        return str(self.elementId)
        


class Inventory(models.Model):
    playerId = models.ForeignKey(Player, on_delete=models.CASCADE)
    # elementId = models.ForeignKey(Elements, on_delete=models.CASCADE)
    elements = ArrayField(models.IntegerField())
    class meta:
        db_table = 'app_inventory'
        app_label = "app"
        managed = True

    def __str__(self):
        return str(self.playerId)
