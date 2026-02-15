import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) throw new ApiError(400, "User already exists");

  const user = await User.create({ name, email, password });

  const token = generateToken(user._id);
  

  res.status(201).json(
    new ApiResponse(201, { user, token }, "User registered")
  );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

const user = await User.findOne({ email }).select("+password");


  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(400, "Invalid credentials");
  }

  const token = generateToken(user._id);
  user.password = undefined;

  res.json(new ApiResponse(200, { user, token }, "Login successful"));
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json(
    new ApiResponse(200, user, "User fetched successfully")
  );
});
