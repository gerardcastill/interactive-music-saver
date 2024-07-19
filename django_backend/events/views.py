from datetime import datetime
import requests
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
import os

API_KEY = os.getenv('TICKETMASTER_API_KEY')

# In-memory store for favorite events
favorite_events = []

class EventViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['get'])
    def get_events(self, request):
        city = request.query_params.get('city', '')
        if not city:
            return Response({'error': 'City parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

        today = datetime.today().strftime('%Y-%m-%d')
        url = 'https://app.ticketmaster.com/discovery/v2/events.json'
        params = {
            'apikey': API_KEY,
            'keyword': 'music',
            'city': city,
            'countryCode': 'US',
            'onsaleStartDateTime': f'{today}T00:00:00Z',
            'classificationName': 'Music'
        }

        response = requests.get(url, params=params)

        if response.status_code != 200:
            return Response({'error': 'Error fetching events'}, status=response.status_code)

        data = response.json().get('_embedded', {}).get('events', [])

        # Filter out events with invalid dates
        events = []
        for event in data:
            date_time = event.get('dates', {}).get('start', {}).get('dateTime')
            if date_time and '_embedded' in event and 'venues' in event['_embedded']:
                try:
                    datetime.strptime(date_time, '%Y-%m-%dT%H:%M:%SZ')
                    events.append({
                        'id': event['id'],
                        'name': event['name'],
                        'url': event['url'],
                        'start_date': date_time,
                        'city': event['_embedded']['venues'][0]['city']['name'],
                        'state': event['_embedded']['venues'][0]['state']['name'],
                        'info': event.get('info', ''),
                        'images': event.get('images', [])  # Include images
                    })
                except ValueError:
                    pass


        # Sort events by start date
        events = sorted(events, key=lambda x: x['start_date'])

        return Response(events, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def get_favorite_events(self, request):
        return Response(favorite_events, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def add_favorite_event(self, request):
        event = request.data
        if not any(fav['id'] == event['id'] for fav in favorite_events):
            favorite_events.append(event)
        return Response(favorite_events, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def remove_favorite_event(self, request):
        event_id = request.data.get('event_id')
        global favorite_events
        favorite_events = [event for event in favorite_events if event['id'] != event_id]
        return Response(favorite_events, status=status.HTTP_200_OK)