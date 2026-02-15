const BASE_URL = "http://localhost:3000/api/v1";

const getToken = () => localStorage.getItem("token");

const request = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken() ? `Bearer ${getToken()}` : "",
    },
    ...options,
  });

   if (res.status === 204) return null;

  let data;
  try {
    data = await res.json();
  } catch (err) {
    throw new Error("Invalid JSON response from server");
  }

  if (!res.ok) throw new Error(data.message || "Something went wrong");

  return data.data;
};

export const api = {
  // Auth
  register: (body) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(body) }),

  login: (body) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  getMe: () => request("/auth/me"),

  // Events
  getEvents: (query = "") => request(`/events${query}`),

  getEventById: (id) => request(`/events/${id}`),

  createEvent: (body) =>
    request("/events", { method: "POST", body: JSON.stringify(body) }),
  
  getCategories: () => request("/events/categories"),

  // Registrations
  registerForEvent: (eventId) =>
    request(`/registrations/${eventId}`, { method: "POST" }),

  cancelRegistration: (eventId) =>
    request(`/registrations/${eventId}`, { method: "DELETE" }),

  getUserRegistrations: () => request("/registrations/my-events"),
};