from django.db import models

class User(models.Model):
    email = models.CharField(max_length=20, default='')
    username = models.CharField(max_length=12, default='')
    password = models.CharField(max_length=30, default='')


class Inventory(models.Model):
    elementId = models.CharField(max_length=16)
    elementName = models.CharField(max_length=16)


class UserInventory(models.Model):
    userId = models.CharField(max_length=16)
    itemId = models.IntegerField(default=1)
    credits = models.IntegerField(default=500)
    alchemyPoints = models.IntegerField(default=100)
    currentTier = models.IntegerField(default=1)

    def get_credits(self):
        return 'User: ' + self.userId + ' has ' + self.credits + ' credits.'

    # def __str__(self):
    #     return self.username
