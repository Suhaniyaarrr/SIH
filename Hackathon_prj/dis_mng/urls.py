from django.contrib import admin
from django.urls import path, include
from dis_mng import views
from .views import weather_data
# from .views import extreme_cities
urlpatterns = [
    path('', views.index, name='index'),
    path('api/weather/', weather_data, name='weather_data'),
    # path('extreme-weather/', views.extreme_weather_view, name='extreme_weather'),
]