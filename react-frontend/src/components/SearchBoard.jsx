import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'IPtyCoigNxyi6bERnADd1qXkyQi83qqd'; // Replace with your Ticketmaster API key

export default function SearchBoard() {
    const [city, setCity] = useState('');
    const [attractions, setAttractions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAttractions = async (city) => {
        try {
            setLoading(true);
            const response = await axios.get('https://app.ticketmaster.com/discovery/v2/attractions.json', {
                params: {
                    apikey: API_KEY,
                    keyword: 'music',
                    city: city,
                    countryCode: 'US'
                }
            });
            setAttractions(response.data._embedded ? response.data._embedded.attractions : []);
            setLoading(false);
        } catch (error) {
            setError('Error fetching attractions');
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city) {
            fetchAttractions(city);
        }
    };

    return (
        <div className="relative z-10 w-full p-4 sm:p-6 md:p-8 bg-white shadow-md">
            <div className="max-w-xl mx-auto">
                <form onSubmit={handleSubmit} className="flex items-center">
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
                    <h1 className="text-2xl font-bold">Music Attractions in {city}</h1>
                    <ul className="mt-2">
                        {attractions.map((attraction) => (
                            <li key={attraction.id} className="mt-2">
                                {attraction.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

