from django.contrib import admin
from django.urls import path, include
from dis_mng import views
from .views import weather_data
urlpatterns = [
    path('', views.index, name='index'),
    path('api/weather/', weather_data, name='weather_data'),
]