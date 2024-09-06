from django.contrib import admin
from django.urls import path, include
from dis_mng import views
urlpatterns = [
    path('', views.index, name='index'),
]