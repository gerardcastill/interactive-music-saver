import { StarIcon as OutlineStarIcon, StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';

const EventList = ({ events, toggleFavorite }) => {
    return (
        <ul className="mt-2 w-full">
            {events.map((event) => (
                <li key={event.id} className="flex flex-col md:flex-row items-start justify-between gap-x-6 py-5 w-full border-b border-gray-200">
                    {event.images && event.images[0] && (
                        <img
                            src={event.images[0].url}
                            alt={event.name}
                            className="w-24 h-24 object-cover rounded-md"
                        />
                    )}
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
                            {event.start_date && (
                                <span className="ml-2 text-sm text-gray-500 ring-1 ring-gray-300 rounded-full px-2 py-1">
                                    {new Date(event.start_date).toLocaleString()}
                                </span>
                            )}
                        </div>
                        {event.city && event.state && (
                            <p className="text-sm leading-5 text-gray-700">
                                {event.city}, {event.state}
                            </p>
                        )}
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
    );
};

export default EventList;

