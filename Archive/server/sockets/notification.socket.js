export default function notificationSocket(io) {
  io.on("connection", (socket) => {
    socket.on("join-notification", (userId) => {
      if (!userId) return;
      socket.join(`notification-${userId}`);
    });

    socket.on("new-notification", (data) => {
      if (!data || !data.userId) return;

      io.to(`notification-${data.userId}`).emit("notification-added", data);
    });

    socket.on("mark-notification-read", (data) => {
      if (!data || !data.userId) return;

      io.to(`notification-${data.userId}`).emit("notification-read", data);
    });
  });
}