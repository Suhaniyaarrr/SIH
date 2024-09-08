from django.db import models

class City(models.Model):
    name = models.CharField(max_length=100)
    state = models.CharField(max_length=100)

class Weather(models.Model):
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    temperature = models.FloatField()
    weather_description = models.CharField(max_length=255)
    humidity = models.FloatField()
    wind_speed = models.FloatField()