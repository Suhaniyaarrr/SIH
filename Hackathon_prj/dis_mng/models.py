from django.db import models

# class Weather(models.Model):
#     city = models.CharField(max_length=100)
#     state = models.CharField(max_length=100)
#     description = models.CharField(max_length=255)
#     temperature = models.FloatField()
#     humidity = models.FloatField()
#     wind_speed = models.FloatField()
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f'{self.city}, {self.state} - {self.description}'