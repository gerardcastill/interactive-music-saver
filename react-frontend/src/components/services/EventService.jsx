import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getEvents = async (city) => {
    try {
        const response = await axios.get(`${API_URL}/get_events/`, {
            params: { city }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching events');
    }
};

export const getFavoriteEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}/get_favorite_events/`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching favorite events');
    }
};

export const addFavoriteEvent = async (event) => {
    try {
        const response = await axios.post(`${API_URL}/add_favorite_event/`, event);
        return response.data;
    } catch (error) {
        throw new Error('Error adding favorite event');
    }
};

export const removeFavoriteEvent = async (event_id) => {
    try {
        const response = await axios.post(`${API_URL}/remove_favorite_event/`, { event_id });
        return response.data;
    } catch (error) {
        throw new Error('Error removing favorite event');
    }
};

