from django.apps import AppConfig
from django.db.models.signals import post_migrate
from dis_mng.management.commands.update_weather import Command as UpdateWeatherCommand

class DisMngConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'dis_mng'

    # def ready(self):
    #     # You can import and register signals or perform other startup tasks here if needed.
    #     pass