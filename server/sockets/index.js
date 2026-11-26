import { Server } from "socket.io";
import notificationSocket from "./notification.socket.js";

const DEFAULT_CLIENT_ORIGIN = "http://localhost:5174";

export function initSocket(httpServer) {
  const allowedOrigins = String(
    process.env.CORS_ORIGIN || process.env.CLIENT_URL || DEFAULT_CLIENT_ORIGIN,
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  const io = new Server(httpServer, {
    cors: {
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error("Origin is not allowed by Socket.IO CORS."));
      },
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  notificationSocket(io);
  return io;
}

export default initSocket;
