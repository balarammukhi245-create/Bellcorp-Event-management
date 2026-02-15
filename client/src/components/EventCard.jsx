import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
   if (!event?._id) return null;
  // const eventId = event._id|| event.id; // Support both _id and id`



  const registered =
    event.registeredCount ??
    (event.capacity - (event.availableSeats ?? 0));

  const isSoldOut = registered >= event.capacity;

  // const eventDate = event.date ? new Date(event.date) : null;
  const eventDate = new Date(event.date);

  return (
    <Link
       to={`/event/${event._id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
    >
      <div className="relative  aspect-video  overflow-hidden">
        <img
          src={event.imageUrl}
          
          alt={event.name}
          onError={(e) => {
    e.target.src = "https://via.placeholder.com/800x400?text=Event";
  }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider">
            {event.category}
          </span>
        </div>
        {isSoldOut && (
          <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
            <span className="text-white font-bold text-lg px-4 py-2 border-2 border-white rounded-lg">
              SOLD OUT
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center text-indigo-600 text-sm font-semibold mb-2">
          <svg
            className="w-4 h-4 mr-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {eventDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {event.name}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-4">
          {event.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center text-slate-500 text-sm">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {event.location}
          </div>
          <span className="text-indigo-600 text-xs font-bold">
           {event.capacity - registered} Left
          </span>
        </div>
      </div>
    </Link>
    
  );
 
};

export default EventCard;
