from django.db import models

class Event(models.Model):
    id = models.CharField(primary_key=True, max_length=100)
    name = models.CharField(max_length=255)
    url = models.URLField()
    start_date = models.DateTimeField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    info = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

class FavoriteEvent(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    def __str__(self):
        return self.event.name