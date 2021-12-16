from django.test import TestCase
from ..models import UserInventory, User, Inventory


class UserInventory(TestCase):
    """ Test module for UserInventory model """

    def setUp(self):
        UserInventory.objects.create(userId=1, itemId=1, credits=500, alchemyPoints=100, currentTier=1)

    def test_userInventory(self):
        userId = UserInventory.objects.get(userId=1)
        userCredits = UserInventory.objects.get(credits=500)
        self.assertEqual(
            userId.get_credits(), "User: 1 has 500 credits.")
