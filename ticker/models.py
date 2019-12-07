from django.db import models
from django.conf import settings

class Stock(models.Model):
    name = models.CharField(max_length=200)
    symbol = models.CharField(max_length=25)
    category = models.CharField(max_length=200)
    region = models.CharField(max_length=200)
    currency = models.CharField(max_length=200)
    market_open = models.TimeField()
    market_close = models.TimeField()
    time_zone = models.CharField(max_length=25)


class Account(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    name = models.CharField(max_length=200)


class Transaction(models.Model):
    account = models.ForeignKey(Account, on_delete=models.PROTECT)
    stock = models.ForeignKey(Stock, on_delete=models.PROTECT)
    time_of_transaction = models.DateTimeField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=4)
    volume = models.DecimalField(max_digits=18, decimal_places=6)
    created_time = models.DateTimeField(auto_now_add=True)
