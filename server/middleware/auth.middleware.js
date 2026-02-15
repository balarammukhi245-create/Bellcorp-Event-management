import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// export const protect = asyncHandler(async (req, res, next) => {
//   const token =
//     req.cookies?.token ||
//     req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     throw new ApiError(401, "Unauthorized access");
//   }

//   const decoded = jwt.verify(token, process.env.JWT_SECRET);

//   const user = await User.findById(decoded.id).select("-password");

//   if (!user) {
//     throw new ApiError(401, "Invalid token");
//   }

//   req.user = user;
//   next();
// });

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new ApiError(401, "Unauthorized access");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Token expired or invalid");
  }
});

