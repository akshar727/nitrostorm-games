from uuid import uuid4
from django.db import models
from django.contrib.auth.models import AbstractUser


class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.FloatField()
    src = models.CharField(max_length=2083)
    websocket = models.CharField(max_length=2083)
    uuid = models.UUIDField(default=uuid4)

    def __str__(self):
        return self.name

class User(AbstractUser):
    # add uuid
    uuid = models.UUIDField(default=uuid4)
    cart = models.ManyToManyField(Product, blank=True)