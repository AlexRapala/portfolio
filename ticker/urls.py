from django.urls import path, include
from rest_framework import routers
from . import views as api_views
from knox import views as knox_views

router = routers.DefaultRouter()
router.register('stocks', api_views.StockView, basename="stocks")
router.register('transactions', api_views.TransactionView, basename="transaction")
router.register('accounts', api_views.AccountsView, basename="accounts")

urlpatterns = [
    path('me/', api_views.ManageUserView.as_view(), name="me"),
    path('auth/login/', api_views.LoginView.as_view(), name='knox_login'),
    path('auth/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('auth/logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    path('', include(router.urls)),
]
