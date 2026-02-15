import express from "express";
import {
  getEvents,
  getSingleEvent,
  createEvent,getCategories} from "../controller/event.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getEvents);
router.get("/categories", getCategories); 
router.get("/:id", getSingleEvent);


// Optional: Only for admin (if needed)
router.post("/", protect, createEvent);

export default router;
