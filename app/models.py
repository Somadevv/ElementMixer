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
        player = Player.objects.create(playerId=instance)
        player.save()
        fire = Elements.objects.get(name="Fire")
        water = Elements.objects.get(name="Water")
        createFire = Inventory.objects.create(playerId=player, name=fire, amount=1)
        createWater = Inventory.objects.create(playerId=player, name=water, amount=1)
        createFire.save()
        createWater.save()
        



@receiver(post_save, sender=User)
def save_user_player(sender, instance, **kwargs):
    instance.player.save()


class Player(models.Model):
    playerId = models.OneToOneField(User, on_delete=models.CASCADE)
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

class Elements(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20, unique=True)
    tier = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)])

    def __str__(self):
        return str(self.name)


class Inventory(models.Model):
    playerId = models.ForeignKey(Player, on_delete=models.CASCADE)
    name = models.ForeignKey(Elements, to_field='name', db_column="name", null=False, on_delete=models.CASCADE, related_name='elementName')
    amount = models.IntegerField()

    def __str__(self):
        return str(self.playerId)
