import express from "express";
import { registerUser, loginUser , getMe} from "../controller/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

router.get("/me", protect, getMe);

export default router;  
