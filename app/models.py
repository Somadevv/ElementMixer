from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models.deletion import CASCADE
from django.contrib.postgres.fields import ArrayField
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.http import request


class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    isMember = models.BooleanField(default=False)
    credits = models.IntegerField(default=500)
    AP = models.IntegerField(default=100)
    playerTier = models.IntegerField(default=1)

    class meta:
        db_table = 'app_players'
        app_label = "app"
        managed = True

    def __str__(self):
        return str(self.playerId)

    def __str__(self):
        return str(self.user)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Player.objects.create(user=instance)
        player = Player.objects.create(user=instance)
        p = Inventory.objects.create(playerId=player.playerId, elements=[1, 2, 3, 4])


@receiver(post_save, sender=User)
def save_user_player(sender, instance, **kwargs):
    instance.player.save()


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
