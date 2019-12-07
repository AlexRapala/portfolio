from rest_framework import serializers
from .models import Stock, Account, Transaction
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'


class StockSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Stock
        fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = '__all__'


class AccountsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = '__all__'