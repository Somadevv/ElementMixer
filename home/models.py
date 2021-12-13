from django.db import models


class Player(models.Model):
    email = models.CharField(max_length=20, default='')
    username = models.CharField(max_length=12, default='')
    password = models.CharField(max_length=30, default='')
    coins = models.IntegerField(default=100)
    tier = models.IntegerField(default=1)

    def __str__(self):
        return self.username
