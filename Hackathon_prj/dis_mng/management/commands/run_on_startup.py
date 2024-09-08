# dis_mng/management/commands/run_on_startup.py
from django.core.management.base import BaseCommand
from dis_mng.management.commands.update_weather import Command as UpdateWeatherCommand

class Command(BaseCommand):
    help = 'Run update_weather on startup'

    def handle(self, *args, **kwargs):
        update_command = UpdateWeatherCommand()
        update_command.handle()
