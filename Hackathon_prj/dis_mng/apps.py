from django.apps import AppConfig
from django.db.models.signals import post_migrate

class DisMngConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'dis_mng'
    