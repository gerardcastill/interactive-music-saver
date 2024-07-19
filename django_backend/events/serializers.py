from rest_framework import serializers
from .models import Event, FavoriteEvent

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class FavoriteEventSerializer(serializers.ModelSerializer):
    event = EventSerializer()

    class Meta:
        model = FavoriteEvent
        fields = '__all__'
