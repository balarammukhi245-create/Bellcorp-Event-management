import express from "express";
import {
  registerEvent,
  cancelRegistration,
  getMyRegistrations,
} from "../controller/registration.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Register for event
router.post("/:eventId", protect, registerEvent);

// Cancel registration
router.delete("/:eventId", protect, cancelRegistration);

// Get logged-in user registrations
router.get("/my-events", protect, getMyRegistrations);



export default router;
