// src/services/EventService.jsx

import axios from 'axios';

const API_KEY = 'empty'; // Replace with your Ticketmaster API key

let favoriteEvents = [];

const getEvents = async (city) => {
    try {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
            params: {
                apikey: API_KEY,
                keyword: 'music',
                city: city,
                countryCode: 'US',
                onsaleStartDateTime: `${today}T00:00:00Z`, // Start from today
                classificationName: 'Music' // Filter for music events
            }
        });
        let events = response.data._embedded ? response.data._embedded.events : [];

        // Filter out events with invalid dates
        events = events.filter(event => {
            const dateTime = event?.dates?.start?.dateTime;
            return dateTime && !isNaN(new Date(dateTime).getTime());
        });

        events = events.sort((a, b) => new Date(a.dates.start.dateTime) - new Date(b.dates.start.dateTime));
        return events;
    } catch (error) {
        throw new Error('Error fetching events');
    }
};

const addFavoriteEvent = async (event) => {
    if (!favoriteEvents.find(fav => fav.id === event.id)) {
        favoriteEvents.push(event);
    }
    return favoriteEvents;
};

const removeFavoriteEvent = async (eventId) => {
    favoriteEvents = favoriteEvents.filter(event => event.id !== eventId);
    return favoriteEvents;
};

const getFavoriteEvents = async () => {
    return favoriteEvents;
};

export { getEvents, addFavoriteEvent, removeFavoriteEvent, getFavoriteEvents };
