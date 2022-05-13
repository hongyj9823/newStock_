from django.apps import AppConfig
import sys

class DbConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'db'
        
