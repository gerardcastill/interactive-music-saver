// src/components/SearchBoard.jsx

import React, { useState, useEffect } from 'react';
import { getEvents, addFavoriteEvent, removeFavoriteEvent, getFavoriteEvents } from '../components/services/EventService';
import { StarIcon as OutlineStarIcon, StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';

const SearchBoard = () => {
    const [city, setCity] = useState('');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        const fetchFavorites = async () => {
            const favoriteEvents = await getFavoriteEvents();
            setFavorites(favoriteEvents);
        };
        fetchFavorites();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!city) return;
        try {
            setLoading(true);
            setError(null);
            setHasSearched(true); // Set hasSearched to true when a search is initiated
            const events = await getEvents(city);
            setEvents(events.map(event => ({
                ...event,
                isFavorite: favorites.some(fav => fav.id === event.id)
            })));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async (event) => {
        let updatedFavorites;
        if (favorites.some(fav => fav.id === event.id)) {
            updatedFavorites = await removeFavoriteEvent(event.id);
        } else {
            updatedFavorites = await addFavoriteEvent(event);
        }
        setFavorites(updatedFavorites);
        setEvents(events.map(evt => ({
            ...evt,
            isFavorite: updatedFavorites.some(fav => fav.id === evt.id)
        })));
    };

    return (
        <div className="relative z-10 w-full p-4 sm:p-6 md:p-8 bg-white shadow-md">
            <div className="w-full max-w-7xl mx-auto">
                <form onSubmit={handleSearch} className="flex items-center w-full">
                    <input
                        type="text"
                        className="h-12 w-full border-2 border-gray-300 rounded-l-md pl-4 pr-4 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm"
                        placeholder="Enter a city..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="h-12 px-4 bg-black text-white rounded-r-md hover:bg-gray-700"
                    >
                        Search
                    </button>
                </form>
                {loading && <p className="mt-4 text-gray-500">Loading...</p>}
                {error && <p className="mt-4 text-red-500">{error}</p>}
                <div className="mt-4">
                    <h1 className="text-2xl font-bold">Music Events in {city}</h1>
                    <ul className="mt-2 w-full">
                        {events.length === 0 && hasSearched && !loading && (
                            <p className="mt-4 text-gray-500">No search results found for '{city}'</p>
                        )}
                        {events.map((event) => (
                            <li key={event.id} className="flex flex-col md:flex-row items-start justify-between gap-x-6 py-5 w-full border-b border-gray-200">
                                <img
                                    src={event.images && event.images[0] && event.images[0].url}
                                    alt={event.name}
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div className="flex-1 ml-4">
                                    <div className="flex items-start gap-x-3">
                                        <a
                                            href={event.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-semibold leading-6 text-gray-900 hover:underline"
                                        >
                                            {event.name}
                                        </a>
                                        {event.dates && event.dates.start && (
                                            <span className="ml-2 text-sm text-gray-500 ring-1 ring-gray-300 rounded-full px-2 py-1">
                                                {new Date(event.dates.start.dateTime).toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm leading-5 text-gray-700">
                                        {event._embedded.venues[0].city.name}, {event._embedded.venues[0].state.name}
                                    </p>
                                    {event.info && (
                                        <p className="mt-1 text-sm leading-5 text-gray-500">
                                            {event.info}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-none items-center gap-x-4 mt-2 md:mt-0">
                                    <button
                                        onClick={() => toggleFavorite(event)}
                                        className="flex items-center"
                                    >
                                        {event.isFavorite ? (
                                            <SolidStarIcon aria-hidden="true" className="h-5 w-5 text-yellow-500" />
                                        ) : (
                                            <OutlineStarIcon aria-hidden="true" className="h-5 w-5 text-gray-500 hover:text-gray-900" />
                                        )}
                                        <span className="sr-only">
                                            {event.isFavorite ? 'Remove from favorites' : 'Add to favorites'}, {event.name}
                                        </span>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SearchBoard;
