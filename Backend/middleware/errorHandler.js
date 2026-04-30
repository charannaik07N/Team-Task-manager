const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong MongoDB ID error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err.statusCode = 400;
    err.message = message;
  }

  // Duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    err.statusCode = 400;
    err.message = message;
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token";
    err.statusCode = 401;
    err.message = message;
  }

  if (err.name === "TokenExpiredError") {
    const message = "Token has expired";
    err.statusCode = 401;
    err.message = message;
  }

  console.error("Error:", {
    statusCode: err.statusCode,
    message: err.message,
    name: err.name,
    stack: err.stack,
  });

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

module.exports = { errorHandler };
