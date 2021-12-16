from django.db import models
from django.db.models.deletion import CASCADE


class User(models.Model):
    userId = models.AutoField(primary_key=True)
    username = models.CharField(max_length=12, default='')
    email = models.CharField(max_length=20, default='')
    password = models.CharField(max_length=30, default='')
    credits = models.IntegerField(default=500)
    alchemyPoints = models.IntegerField(default=100)
    currentTier = models.IntegerField(default=1)

    # def __str__(self):
    #     template = '{username}'
    #     return template.format(self)


class Elements(models.Model):
    itemId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=16)

    # def __str__(self):
    #     template = '{itemId} {name}'
    #     return template.format(self)


class Inventory(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    itemId = models.ForeignKey(Elements, on_delete=models.CASCADE)
    # def __str__(self):
    #     template = '{userId} {itemId}'
    #     return template.format(self)



    # def __str__(self):
    #     return self.username
