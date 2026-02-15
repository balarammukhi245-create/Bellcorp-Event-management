import { ApiError } from "../utils/ApiError.js";

export const errorMiddleware = (err, req, res, next) => {
  let error = err;

  // If error is not ApiError, convert it
  if (!(error instanceof ApiError)) {
    error = new ApiError(
      error.statusCode || 500,
      error.message || "Internal Server Error"
    );
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue).join(", ");
    error = new ApiError(400, `${field} already exists`);
  }

  // Mongoose Cast Error (Invalid ObjectId)
  if (err.name === "CastError") {
    error = new ApiError(400, "Invalid ID format");
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors || [],
  });
};
