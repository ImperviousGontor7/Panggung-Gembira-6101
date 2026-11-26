import { APP_ENV } from "./env.js";

function parseOrigins(value) {
  if (!value) return [];

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

const fallbackOrigin = "http://localhost:5174";

const socketOrigins = [
  APP_ENV.CLIENT_URL || fallbackOrigin,
  ...parseOrigins(process.env.CLIENT_URLS),
].filter(Boolean);

export const socketOptions = {
  cors: {
    origin: socketOrigins,
    credentials: true,
  },
  transports: ["websocket", "polling"],
};

export default socketOptions;