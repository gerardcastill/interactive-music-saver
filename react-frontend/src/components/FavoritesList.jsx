// src/components/FavoritesList.jsx

import React, { useState, useEffect } from 'react';
import { getFavoriteEvents, removeFavoriteEvent } from './services/EventService';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';

const FavoritesList = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const favoriteEvents = await getFavoriteEvents();
            setFavorites(favoriteEvents);
        };
        fetchFavorites();
    }, []);

    const handleRemoveFavorite = async (eventId) => {
        const updatedFavorites = await removeFavoriteEvent(eventId);
        setFavorites(updatedFavorites);
    };

    return (
        <div className="relative z-10 w-full p-4 sm:p-6 md:p-8 bg-white shadow-md">
            <div className="w-full max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold">Your Favorites</h1>
                <ul className="mt-2 w-full">
                    {favorites.map((event) => (
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
                                        <span
                                            className="ml-2 text-sm text-gray-500 ring-1 ring-gray-300 rounded-full px-2 py-1">
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
                                    onClick={() => handleRemoveFavorite(event.id)}
                                    className="flex items-center"
                                >
                                    <SolidStarIcon aria-hidden="true" className="h-5 w-5 text-yellow-500" />
                                    <span className="sr-only">
                                        Remove from favorites, {event.name}
                                    </span>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FavoritesList;

