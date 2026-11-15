import "dotenv/config";

function required(name, fallback = undefined) {
  const value = process.env[name];

  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    if (fallback !== undefined) {
      return fallback;
    }

    throw new Error(
      `${name} is required but was not configured.`
    );
  }

  return value;
}

function number(name, fallback) {
  const raw = process.env[name];

  if (
    raw === undefined ||
    raw === ""
  ) {
    return fallback;
  }

  const parsed = Number(raw);

  if (Number.isNaN(parsed)) {
    throw new Error(
      `${name} must be a valid number.`
    );
  }

  return parsed;
}

function parseDurationToMs(value, fallback) {
  const raw = value ?? fallback;

  if (
    raw === undefined ||
    raw === null ||
    raw === ""
  ) {
    throw new Error("Duration is required.");
  }

  if (typeof raw === "number") {
    return raw;
  }

  const normalized = String(raw).trim();

  if (!normalized) {
    throw new Error("Duration is required.");
  }

  if (/^\d+$/.test(normalized)) {
    return Number(normalized);
  }

  const match = normalized.match(
    /^(\d+(?:\.\d+)?)(ms|s|m|h|d|w)$/i
  );

  if (!match) {
    throw new Error(
      `Invalid duration value: ${normalized}`
    );
  }

  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();

  const multipliers = {
    ms: 1,
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
  };

  return Math.round(amount * multipliers[unit]);
}

const NODE_ENV = process.env.NODE_ENV || "development";

export const APP_ENV = Object.freeze({
  NODE_ENV,

  PORT: number("PORT", 5000),
  HOST: process.env.HOST || "0.0.0.0",

  DATABASE_URL: required("DATABASE_URL"),

  API_URL: process.env.API_URL || "http://localhost:5000/api",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

  JWT_ACCESS_SECRET: required(
    "JWT_ACCESS_SECRET",
    NODE_ENV === "development"
      ? "development-access-secret-change-me"
      : undefined
  ),

  JWT_REFRESH_SECRET: required(
    "JWT_REFRESH_SECRET",
    NODE_ENV === "development"
      ? "development-refresh-secret-change-me"
      : undefined
  ),

  JWT_ACCESS_EXPIRES_IN:
    process.env.JWT_ACCESS_EXPIRES_IN || "15m",

  JWT_REFRESH_EXPIRES_IN:
    process.env.JWT_REFRESH_EXPIRES_IN || "7d",

  JWT_ACCESS_EXPIRES_IN_MS: parseDurationToMs(
    process.env.JWT_ACCESS_EXPIRES_IN,
    "15m"
  ),

  JWT_REFRESH_EXPIRES_IN_MS: parseDurationToMs(
    process.env.JWT_REFRESH_EXPIRES_IN,
    "7d"
  ),

  CORS_ORIGIN:
    process.env.CORS_ORIGIN || "http://localhost:5173",

  STORAGE_PROVIDER:
    process.env.STORAGE_PROVIDER || "local",

  UPLOAD_MAX_SIZE: number(
    "UPLOAD_MAX_SIZE",
    10 * 1024 * 1024
  ),

  LOG_LEVEL: process.env.LOG_LEVEL || "info",
});

export function isProduction() {
  return APP_ENV.NODE_ENV === "production";
}

export function isDevelopment() {
  return APP_ENV.NODE_ENV === "development";
}

export default APP_ENV;