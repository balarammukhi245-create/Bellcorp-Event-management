# 🎟️ Event Discovery & Registration Platform (MERN Stack)

A full-stack Event Discovery and Registration platform built using the **MERN stack**, allowing users to browse events, filter/search them, register securely, and manage their registrations — with strict prevention of overbooking.

---

## 🚀 Features

### 👤 Authentication
- User registration & login with JWT authentication
- Secure password hashing using bcrypt
- Protected routes using auth middleware
- Persistent login using localStorage

### 📅 Event Management
- Browse all events
- Search events by name
- Filter by category and location
- Pagination support
- View event details
- Real-time seat availability handling

### 📝 Event Registration
- Register for events
- Prevent duplicate registrations
- Atomic seat decrement to prevent overbooking
- Cancel registrations and restore seats
- Dashboard with upcoming & past events

### 🗂️ Categories
- Dynamic categories fetched from database

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Context API (Auth)
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt
- Custom Error Handling

---

## 🗄️ Database Design

### User
- name
- email (unique)
- password (hashed)

### Event
- name
- organizer
- location
- date
- description
- category
- capacity
- availableSeats
- imageUrl
- price

### Registration
- userId → User
- eventId → Event  
(Unique compound index to prevent duplicate registration)

---

## 🔐 Security & Reliability
- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes using middleware
- Atomic seat updates using MongoDB `$inc`
- Centralized error handling

---

## 🌍 API Endpoints

### Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`

### Events
- `GET /api/v1/events`
- `GET /api/v1/events/:id`
- `GET /api/v1/events/categories`
- `POST /api/v1/events` (protected)

### Registrations
- `POST /api/v1/registrations/:eventId`
- `DELETE /api/v1/registrations/:eventId`
- `GET /api/v1/registrations/my-events`

---

## ⚙️ Environment Variables

### Backend `.env`
```env
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev