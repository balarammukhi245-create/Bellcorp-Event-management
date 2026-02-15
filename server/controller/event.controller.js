import { Event } from "../models/event.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const getEvents = asyncHandler(async (req, res) => {
  const { search, category, location, page = 1, limit = 10 , startDate, endDate} = req.query;

  let query = {};

  if (search) {
  query.name = { $regex: search, $options: "i" };
}
  if (category) query.category = category.toUpperCase();
  
  if (location) {
    query.location = { $regex: location, $options: "i" };
  }
  
  if (startDate && endDate) {
  query.date = {
    $gte: new Date(startDate),
    $lte: new Date(endDate),
  };
}

const total = await Event.countDocuments(query);

  const events = await Event.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ date: 1 });

   res.json(
    new ApiResponse(200, {
      events,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    })
  );
});

export const getSingleEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) throw new ApiError(404, "Event not found");

  res.json(new ApiResponse(200, event));
});

export const createEvent = asyncHandler(async (req, res) => {
  const { capacity, ...rest } = req.body;

  const event = await Event.create({
    ...rest,
    capacity,
    availableSeats: capacity,
  });

  res.status(201).json(new ApiResponse(201, event, "Event created"));
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Event.distinct("category"); // get unique categories from DB
  res.json(new ApiResponse(200, categories, "Categories fetched successfully"));
});