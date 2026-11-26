import { io } from "socket.io-client";

const SOCKET_BASE_URL =
  import.meta.env.VITE_SOCKET_URL ||
  (typeof window !== "undefined" ? window.location.origin : "http://localhost:5174");

function getStoredToken() {
  return localStorage.getItem("token");
}

const socket = io(SOCKET_BASE_URL, {
  autoConnect: false,
  transports: ["websocket"],
  withCredentials: true,
  auth: {
    token: getStoredToken(),
  },
});

export function connectSocket() {
  socket.auth = {
    token: getStoredToken(),
  };

  if (!socket.connected) {
    socket.connect();
  }

  return socket;
}

export function disconnectSocket() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export function refreshSocketAuth() {
  socket.auth = {
    token: getStoredToken(),
  };

  return socket;
}

export default socket;