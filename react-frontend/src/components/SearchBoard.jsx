import { useState, useEffect, useRef } from 'react';
import { getEvents, addFavoriteEvent, removeFavoriteEvent, getFavoriteEvents } from '../components/services/EventService';
import EventList from './EventList';

const SearchBoard = () => {
    const [city, setCity] = useState('');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const favoritesFetched = useRef(false);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (favoritesFetched.current) return;
            favoritesFetched.current = true;
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
            setHasSearched(true);
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
                    {events.length === 0 && hasSearched && !loading && (
                        <p className="mt-4 text-gray-500">No search results found for '{city}'</p>
                    )}
                    <EventList events={events} toggleFavorite={toggleFavorite} />
                </div>
            </div>
        </div>
    );
};

export default SearchBoard;
