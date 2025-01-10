
# Create your models here.
from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=255)
    overview = models.TextField()
    popularity = models.FloatField()
    vote_average = models.FloatField()
    vote_count = models.IntegerField()

    def __str__(self):
        return self.title
