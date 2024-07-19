import { useState, useEffect, useRef } from 'react';
import { getFavoriteEvents, removeFavoriteEvent } from '../components/services/EventService';
import EventList from './EventList';

const FavoritesList = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const favoritesFetched = useRef(false);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (favoritesFetched.current) return;
            favoritesFetched.current = true;
            try {
                const favoriteEvents = await getFavoriteEvents();
                setFavorites(favoriteEvents);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, []);

    const toggleFavorite = async (event) => {
        const updatedFavorites = await removeFavoriteEvent(event.id);
        setFavorites(updatedFavorites);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="relative z-10 w-full p-4 sm:p-6 md:p-8 bg-white shadow-md">
            <div className="w-full max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
                {favorites.length === 0 ? (
                    <p>No favorite events found.</p>
                ) : (
                    <EventList events={favorites.map(event => ({ ...event, isFavorite: true }))} toggleFavorite={toggleFavorite} />
                )}
            </div>
        </div>
    );
};

export default FavoritesList;
