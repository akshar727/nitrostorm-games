from uuid import uuid4
from django.db import models
from django.contrib.auth.models import AbstractUser


class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.FloatField()
    src = models.CharField(max_length=2083)
    websocket = models.CharField(max_length=2083)
    download_url = models.CharField(max_length=2084,default="sdfsdf")
    uuid = models.UUIDField(default=uuid4)

    def __str__(self):
        return self.name
    


class Purchase(models.Model):
    content = models.ManyToManyField(Product)
    date = models.DateTimeField(auto_now=True)
    cost = models.FloatField()
    def __str__(self):
        return f"{', '.join([p.name for p in self.content.all()])} on {self.date}"

class User(AbstractUser):
    # add uuid

    uuid = models.UUIDField(default=uuid4)
    cart = models.ManyToManyField(Product, blank=True)
    purchases = models.ManyToManyField(Purchase, blank=True)

