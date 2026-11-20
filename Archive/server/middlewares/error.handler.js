import logger from "../config/logger.js";

/**
 * Menangani route yang tidak ditemukan.
 */
export function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;

  next(error);
}

/**
 * Global error handler Express.
 */
export function errorHandler(err, req, res, _next) {
  const statusCode = Number.isInteger(err?.statusCode)
    ? err.statusCode
    : 500;

  const isDevelopment = process.env.NODE_ENV === "development";

  logger.error({
    message: err?.message || "Internal Server Error",
    statusCode,
    method: req.method,
    url: req.originalUrl,
    stack: err?.stack,
  });

  const response = {
    success: false,
    message:
      statusCode >= 500 && !isDevelopment
        ? "Internal Server Error"
        : err?.message || "Internal Server Error",
  };

  if (isDevelopment && err?.stack) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}