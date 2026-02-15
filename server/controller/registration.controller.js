import { Registration } from "../models/registration.models.js";
import { Event } from "../models/event.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const registerEvent = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { eventId } = req.params;

  // Check if already registered
  const existingRegistration = await Registration.findOne({
    userId,
    eventId,
  });

  if (existingRegistration) {
    throw new ApiError(400, "You are already registered for this event");
  }

  //  Atomically decrement seat ONLY if seats are available
  const event = await Event.findOneAndUpdate(
    {
      _id: eventId,
      availableSeats: { $gt: 0 },
    },
    {
      $inc: { availableSeats: -1 },
    },
    {
      new: true,
    }
  );

  if (!event) {
    throw new ApiError(400, "Event not found or sold out");
  }

  // Create registration
  const registration = await Registration.create({
    userId,
    eventId,
  });

  res.status(201).json({
    success: true,
    message: "Successfully registered for the event",
    data: {
      registration,
      remainingSeats: event.availableSeats,
    },
  });
});

export const cancelRegistration = asyncHandler(async (req, res) => {
  const registration = await Registration.findOneAndDelete({
    userId: req.user._id,
    eventId: req.params.eventId,
  });

  if (!registration)
    throw new ApiError(404, "Registration not found");

  // Atomic increment
  await Event.findByIdAndUpdate(
    req.params.eventId,
    { $inc: { availableSeats: 1 } }
  );
  res.json(new ApiResponse(200, null, "Registration cancelled"));
});

export const getMyRegistrations = asyncHandler(async (req, res) => {
  const registrations = await Registration.find({
    userId: req.user._id,
  }).populate("eventId");

  const now = new Date();

const upcoming = registrations.filter(
  (r) => r.eventId && new Date(r.eventId.date) > now
);

const past = registrations.filter(
  (r) => r.eventId && new Date(r.eventId.date) <= now
);

  res.json(
    new ApiResponse(200, { upcoming, past }, "User events fetched")
  );
});