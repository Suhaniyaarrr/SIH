# dis_mng/management/commands/update_weather.py
from django.core.management.base import BaseCommand
import requests
from dis_mng.models import Weather
import json

class Command(BaseCommand):
    help = 'Update weather data for major cities'

    def handle(self, *args, **kwargs):
        # Load city data
        with open('static/city_with_states.json', 'r') as file:
            cities = json.load(file)

        # Load extreme weather conditions
        with open('static/extreme_weather_conditions.json', 'r') as file:
            extreme_weather_conditions = json.load(file)

        # Example API call and update logic
        for city in cities:
            response = requests.get(f'http://api.openweathermap.org/data/2.5/weather', params={
                'q': f"{city['city']},{city['state']}",
                'appid': '4aa285508118d106aa265c2c2397529f'
            })
            weather_data = response.json()

            # Process and update the weather data in the database
            Weather.objects.update_or_create(
                city=city['city'],
                defaults={
                    'description': weather_data['weather'][0]['description'],
                    'temperature': weather_data['main']['temp'],
                    'humidity': weather_data['main']['humidity'],
                    'wind_speed': weather_data['wind']['speed']
                }
            )

        self.stdout.write(self.style.SUCCESS('Successfully updated weather data.'))
