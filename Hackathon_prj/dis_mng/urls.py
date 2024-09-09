from django.contrib import admin
from django.urls import path, include
from dis_mng import views
from .views import weather_data
from .views import get_openweathermap_api_key
# from .views import extreme_cities
urlpatterns = [
    path('', views.index, name='index'),
    path('api/weather/', weather_data, name='weather_data'),
    path('api/cities_with_states/', views.cities_with_states, name='cities_with_states'),
    path('city-weather/', views.city_weather_view, name='city_weather'),
    path('get-api-key/', get_openweathermap_api_key, name='get_api_key'),
    path('update-weather/', views.cities_with_states, name='update_weather'),
    # path('extreme-weather/', views.extreme_weather_view, name='extreme_weather'),
]