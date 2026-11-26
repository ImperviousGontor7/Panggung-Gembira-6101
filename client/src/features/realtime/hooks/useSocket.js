import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

function resolveSocketUrl(url) {
  if (url) return url;

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "http://localhost:5174";
}

export function useSocket({
  url,
  path = "/socket.io",
  autoConnect = true,
  transports = ["websocket", "polling"],
  withCredentials = true,
} = {}) {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  const connect = useCallback(() => {
    if (socketRef.current) {
      return socketRef.current;
    }

    const socket = io(resolveSocketUrl(url), {
      path,
      transports,
      withCredentials,
      autoConnect: false,
    });

    socket.on("connect", () => {
      setConnected(true);
      setError(null);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("connect_error", (err) => {
      setError(err);
      setConnected(false);
    });

    socketRef.current = socket;
    return socket;
  }, [url, path, transports, withCredentials]);

  useEffect(() => {
    const socket = connect();

    if (autoConnect && !socket.connected) {
      socket.connect();
    }

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;
      setConnected(false);
    };
  }, [connect, autoConnect]);

  const emit = useCallback((event, payload, ack) => {
    const socket = socketRef.current || connect();

    if (typeof ack === "function") {
      socket.emit(event, payload, ack);
      return;
    }

    socket.emit(event, payload);
  }, [connect]);

  const on = useCallback((event, handler) => {
    const socket = socketRef.current || connect();
    socket.on(event, handler);

    return () => {
      socket.off(event, handler);
    };
  }, [connect]);

  const off = useCallback((event, handler) => {
    if (!socketRef.current) return;
    socketRef.current.off(event, handler);
  }, []);

  const disconnect = useCallback(() => {
    if (!socketRef.current) return;
    socketRef.current.disconnect();
  }, []);

  const joinForum = useCallback((forumId) => {
    emit("join-forum", forumId);
  }, [emit]);

  const sendForumComment = useCallback((data) => {
    emit("new-comment", data);
  }, [emit]);

  return {
    socket: socketRef.current,
    connected,
    error,
    connect,
    disconnect,
    emit,
    on,
    off,
    joinForum,
    sendForumComment,
  };
}

export default useSocket;