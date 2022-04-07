from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models.deletion import CASCADE
from django.contrib.postgres.fields import ArrayField
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.http import request


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Player.objects.create(playerId=instance)

        # fire = Elements.objects.get(name="Fire")
        # water = Elements.objects.get(name="Water")
        # createFire = Inventory.objects.create(
        #     playerId=player, name=fire, amount=1)
        # createWater = Inventory.objects.create(
        #     playerId=player, name=water, amount=1)
        # createFire.save()
        # createWater.save()


@receiver(post_save, sender=User)
def save_user_player(sender, instance, **kwargs):
    instance.player.save()


class Player(models.Model):
    playerId = models.OneToOneField(User, on_delete=models.CASCADE)
    credits = models.IntegerField(default=500)
    recipes = ArrayField(models.CharField(
        max_length=50, blank=True, null=True), blank=True, null=True, default=list)

    def __str__(self):
        return str(self.playerId)


class Elements(models.Model):
    elementId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return str(self.name)


class Inventory(models.Model):
    playerId = models.ForeignKey(Player, on_delete=models.CASCADE)
    eleId = models.ForeignKey(
        Elements, to_field='elementId', on_delete=models.CASCADE)
    name = models.ForeignKey(Elements, to_field='name', db_column="name",
                             null=False, on_delete=models.CASCADE, related_name='elementName')
    amount = models.IntegerField(validators=[MinValueValidator(1)])

    def __str__(self):
        return str(self.name)


class Recipes(models.Model):
    recipe = models.AutoField(primary_key=True)
    name = models.CharField(max_length=12)
    combination = ArrayField(models.IntegerField())
    reward = models.IntegerField()

    def __str__(self):
        return str(self.name)
