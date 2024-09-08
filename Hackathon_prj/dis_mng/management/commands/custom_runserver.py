# dis_mng/management/commands/custom_runserver.py
from django.core.management.base import BaseCommand
from django.core.management.commands.runserver import Command as RunserverCommand
from dis_mng.management.commands.run_on_startup import Command as RunOnStartupCommand

class Command(RunserverCommand):
    def handle(self, *args, **kwargs):
        super().handle(*args, **kwargs)
        startup_command = RunOnStartupCommand()
        startup_command.handle()
