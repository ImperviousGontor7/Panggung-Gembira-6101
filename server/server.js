import app from "./app.js";
import logger from "./config/logger.js";
import {
  APP_ENV,
} from "./config/env.js";
import {
  connectDatabase,
  disconnectDatabase,
} from "./config/prisma.js";

function getDisplayHost(host) {
  if (
    host === "0.0.0.0" ||
    host === "::" ||
    host === "127.0.0.1"
  ) {
    return "localhost";
  }

  return host;
}

async function startServer() {
  await connectDatabase();

  const server = app.listen(
    APP_ENV.PORT,
    APP_ENV.HOST,
    () => {
      logger.info(
        `Server running on http://${getDisplayHost(APP_ENV.HOST)}:${APP_ENV.PORT}`
      );
      logger.info(
        `Swagger docs available at http://${getDisplayHost(APP_ENV.HOST)}:${APP_ENV.PORT}/api-docs`
      );
    }
  );

  server.on("error", (err) => {
    logger.error("Server failed to start", err);
    process.exit(1);
  });

  const shutdown = async (signal) => {
    logger.info(`${signal} received, shutting down...`);

    server.close(async () => {
      try {
        await disconnectDatabase();
        logger.info("Database disconnected");
        process.exit(0);
      } catch (err) {
        logger.error("Failed to disconnect database", err);
        process.exit(1);
      }
    });
  };

  process.once("SIGINT", () => shutdown("SIGINT"));
  process.once("SIGTERM", () => shutdown("SIGTERM"));
}

startServer().catch((err) => {
  logger.error("Failed to boot server", err);
  process.exit(1);
});