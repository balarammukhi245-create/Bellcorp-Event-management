import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/apiService.js";
import { useAuth } from "../context/AuthContext.jsx";
import Loader from "../components/Loader.jsx";


const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await api.getEventById(id);
        if (!eventData) return navigate("/");

        setEvent(eventData);

        if (user) {
          const regs = await api.getUserRegistrations();

          const safeRegs = Array.isArray(regs) ? regs : [];

          const alreadyRegistered = safeRegs.some(
            (r) => r.event?._id === id
          );

          setIsRegistered(alreadyRegistered);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, user, navigate]);

  const handleRegistration = async () => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }

      if (isRegistered) {
        await api.cancelRegistration(id);
        setIsRegistered(false);
      } else {
        await api.registerForEvent(id);
        setIsRegistered(true);
      }

      const updatedEvent = await api.getEventById(id);
      setEvent(updatedEvent);

    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <Loader />;
  if (!event) return <div>No event found</div>;

  const registeredCount = event.registeredCount ?? 0;
  const capacity = event.capacity ?? 0;

  const isSoldOut = event.availableSeats === 0 && !isRegistered;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-16">
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
        <img
          src={event.imageUrl}
          alt={event.name}
          className="w-full h-96 object-cover"
        />
        <div className="p-8">
          <h1 className="text-3xl font-extrabold mb-4">{event.name}</h1>
          <p className="text-slate-600 mb-4">{event.description}</p>

          <button
            onClick={handleRegistration}   // ✅ IMPORTANT
            disabled={isSoldOut}
            className={`w-full py-4 rounded-2xl font-bold ${
              isRegistered
                ? 'bg-white border-2 border-red-200 text-red-600'
                : isSoldOut
                ? 'bg-slate-200 text-slate-400'
                : 'bg-indigo-600 text-white'
            }`}
          >
            {isRegistered
              ? 'Cancel Registration'
              : isSoldOut
              ? 'Sold Out'
              : 'Register Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;