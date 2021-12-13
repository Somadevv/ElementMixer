from django.contrib.auth.models import User
from rest_framework import serializers

from home.models import Player


class PlayerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Player
        fields = ['email', 'username',
                  'password', 'email', 'coins', 'tier']
        extra_kwargs = {
            'url': {'view_name': 'player-detail', 'lookup_field': 'id'},
        }
