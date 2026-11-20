import cors from "cors";
import { APP_ENV } from "./env.js";

function normalizeOrigin(value) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed || null;
}

function getAllowedOrigins() {
  const raw = APP_ENV.CORS_ORIGIN;

  if (raw === "*" || !raw) {
    return ["*"];
  }

  return raw
    .split(",")
    .map(normalizeOrigin)
    .filter(Boolean);
}

const allowedOrigins = getAllowedOrigins();

export const corsOptions = Object.freeze({
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes("*")) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(
      new Error("Origin is not allowed by CORS.")
    );
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],

  exposedHeaders: [
    "Content-Length",
    "Content-Type",
  ],

  optionsSuccessStatus: 204,
});

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;