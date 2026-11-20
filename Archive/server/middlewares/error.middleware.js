import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library.js";

export function errorMiddleware(
  err,
  req,
  res,
  next
) {
  if (res.headersSent) {
    return next(err);
  }

  const isProduction =
    process.env.NODE_ENV === "production";

  let statusCode = 500;
  let message =
    "Internal server error.";

  let details = undefined;

  if (
    err instanceof PrismaClientKnownRequestError
  ) {
    switch (err.code) {
      case "P2002":
        statusCode = 409;
        message =
          "Data yang diberikan sudah digunakan.";
        break;

      case "P2025":
        statusCode = 404;
        message =
          "Data yang diminta tidak ditemukan.";
        break;

      case "P2003":
        statusCode = 400;
        message =
          "Relasi data tidak valid.";
        break;

      default:
        statusCode = 400;
        message =
          "Database request gagal.";
        break;
    }
  } else if (
    err instanceof PrismaClientValidationError
  ) {
    statusCode = 400;
    message =
      "Data database tidak valid.";
  } else if (
    err?.name === "ValidationError"
  ) {
    statusCode = 400;
    message =
      err.message || "Validation error.";
  } else if (
    err?.statusCode ||
    err?.status
  ) {
    statusCode =
      Number(err.statusCode || err.status) ||
      500;

    message =
      err.message ||
      message;
  }

  if (
    err?.details &&
    typeof err.details === "object"
  ) {
    details = err.details;
  }

  const response = {
    success: false,
    message,
  };

  if (details !== undefined) {
    response.details = details;
  }

  if (!isProduction && err?.stack) {
    response.stack = err.stack;
  }

  return res
    .status(statusCode)
    .json(response);
}

export default errorMiddleware;