import json
import requests
from decimal import Decimal
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.conf import settings
from django.utils import timezone
from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response
from knox.views import LoginView as KnoxLoginView

from .models import Stock, Account, Transaction
from . import serializers

av_endpoint = "https://www.alphavantage.co/query?function={}&{}={}&apikey={}"

class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


class LoginView(KnoxLoginView):
    permission_classes = (AllowAny,)
    authentication_classes = (CsrfExemptSessionAuthentication,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginView, self).post(request, format=None)


class ManageUserView(generics.RetrieveAPIView):
    serializer_class = serializers.UserSerializer

    def get_object(self):
        return self.request.user


class StockView(viewsets.ModelViewSet):
    model = Stock

    def get_queryset(self):
        return Stock.objects.all()
    
    def get_serializer_class(self):
        return serializers.StockSerializer

    @action(detail=False, methods=['get'])
    def search(self, request, pk=None):
        if(len(request.GET['ticker']) == 0):
            return Response({'bestMatches': []})
        # validate stock to see if it exists in api
        response = requests.get(av_endpoint.format('SYMBOL_SEARCH', 'keywords', request.GET['ticker'], settings.AV_KEY))
        response = response.json()
        if 'Error Message' in response:
            return Response({'bestMatches': []})
        # if not, return error
        if not 'bestMatches' in response:
            return Response({'bestMatches': []})

        # if it is, add it and get the all time data
        stock_list = []
        for stock in response['bestMatches']:
            if Stock.objects.filter(name=stock['2. name']).count():
                continue

            stock_object = Stock(
                name=stock['2. name'],
                symbol=stock['1. symbol'],
                category=stock['3. type'],
                region=stock['4. region'],
                currency=stock['8. currency'],
                market_open=stock['5. marketOpen'],
                market_close=stock['6. marketClose'],
                time_zone=stock['7. timezone'],
            )
            stock_list.append(stock_object)
        Stock.objects.bulk_create(stock_list)
        # return success
        return Response(response)
        
        
    @action(detail=False, methods=['post'])
    def get_ticker(self, request, pk=None):
        print(request.data)
        """
        if not 'ticker' in request.data:
            return Response("No ticker boi")
        response = requests.get(av_endpoint.format('TIME_SERIES_DAILY', 'symbol', request.data['ticker'], settings.AV_KEY))
        response = response.json()

        if 'Error Message' in response:
            return Response("Something wrong boi")
        """   
        return Response('response')

class TransactionView(viewsets.ModelViewSet):
    model = Transaction

    def get_queryset(self):
        return Transaction.objects.all()
    
    def get_serializer_class(self):
        return serializers.TransactionSerializer


class AccountsView(viewsets.ModelViewSet):
    model = Account

    def get_queryset(self):
        return Account.objects.filter(owner=self.request.user)

    def get_serializer_class(self):
        return serializers.AccountsSerializer