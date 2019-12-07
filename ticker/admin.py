from django.contrib import admin
from . import models
# Register your models here.

admin.site.register(models.Stock)
admin.site.register(models.Transaction)
admin.site.register(models.Account)