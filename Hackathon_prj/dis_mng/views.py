from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.views.decorators.http import require_GET
import requests
import os
from django.conf import settings
import json
from .models import City, Weather

@require_GET
def weather_data(request):
    try:
        city = request.GET.get('city', 'delhi')
        api_key = '4aa285508118d106aa265c2c2397529f'
        url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}'

        response = requests.get(url)
        if response.status_code == 200:
            return JsonResponse(response.json())
        elif response.status_code == 404:
            # Handle city not found case
            return JsonResponse({'error': 'City not found!'}, status=404)

        else:
            # Handle other API response errors
            return JsonResponse({'error': 'Unable to fetch weather data'}, status=response.status_code)
        # Create your views here.
    except requests.exceptions.ConnectionError:
        # Handle connection error (likely due to being offline)
        return JsonResponse({'error': 'You are offline. Please reconnect to get updated weather data.'}, status=503)

    except Exception as e:
        # Handle any other unexpected errors
        return JsonResponse({'error': 'An unexpected error occurred'}, status=500)


def index(request):
    # cities_with_states(request)
    return render(request, 'index.html')

def cities_with_states(request):
    json_file_path1 = os.path.join(settings.STATICFILES_DIRS[0], 'cities_with_states.json')
    json_file_path2 = os.path.join(settings.STATICFILES_DIRS[0], 'extreme_weather.json')

    # Load cities and states from JSON file
    with open(json_file_path1, 'r', encoding='utf-8') as file1:
        cities_with_states1 = json.load(file1)
    
    api_key = '4aa285508118d106aa265c2c2397529f'
    for item in cities_with_states1:
        city_name = item['city']
        state_name = item['state']

        # Save city and state to the database
        city, created = City.objects.get_or_create(name=city_name, state=state_name)

        # Fetch weather data from the API
        url = f'http://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={api_key}'
        response = requests.get(url)
        weather_data = response.json()

        # Extract relevant data
        temperature = weather_data.get('main', {}).get('temp', 0)
        weather_description = weather_data.get('weather', [{}])[0].get('description', '')
        humidity = weather_data.get('main', {}).get('humidity', 0)
        wind_speed = weather_data.get('wind', {}).get('speed', 0)

        # Save weather data to the database
        Weather.objects.update_or_create(
            city=city,
            defaults={
                'temperature': temperature,
                'weather_description': weather_description,
                'humidity': humidity,
                'wind_speed': wind_speed
            }
        )

    return JsonResponse({'status': 'Data updated successfully'}, safe=False)

def city_weather_view(request):
    # Retrieve all weather data with related city information
    weather_data = Weather.objects.select_related('city').all()

    # Prepare a list of dictionaries with city names and weather descriptions
    data = [
        {
            'city': weather.city.name,
            'weather_description': weather.weather_description
        } for weather in weather_data
    ]
    
    json_file_path2 = os.path.join(settings.STATICFILES_DIRS[0], 'extreme_weather.json')
    with open(json_file_path2, 'r', encoding='utf-8') as file2:
        extreme_weather = json.load(file2)
    extreme_weather = extreme_weather.keys()
    extreme_weather = list(extreme_weather)
    str_vul = {}
    for item in data:
        if item['weather_description'] in extreme_weather:
            str_vul[item['city']]=item['weather_description']
        else:
            pass
    # Return data as JSON
    return JsonResponse(str_vul, safe=False)

