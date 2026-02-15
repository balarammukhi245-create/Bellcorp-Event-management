import React, { useEffect, useState } from "react";
import { api } from "../services/apiService.js";
import Loader from "../components/Loader.jsx";

const Dashboard = () => {
  const [data, setData] = useState({ upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await api.getUserRegistrations();
        setData(res || { upcoming: [], past: [] });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6 space-y-10">
      <section>
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        {data.upcoming.length === 0 ? (
          <p>No upcoming events</p>
        ) : (
          data.upcoming.map((r) => (
            <div key={r._id} className="border p-4 rounded">
              <h3>{r.eventId.name}</h3>
            </div>
          ))
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Past Events</h2>
        {data.past.length === 0 ? (
          <p>No past events</p>
        ) : (
          data.past.map((r) => (
            <div key={r._id} className="border p-4 rounded">
              <h3>{r.eventId.name}</h3>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
export default Dashboard;