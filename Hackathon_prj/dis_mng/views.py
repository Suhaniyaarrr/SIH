from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.views.decorators.http import require_GET
import requests


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
    return render(request, 'index.html')
