import winston from "winston";

const isProduction =
  process.env.NODE_ENV === "production";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (isProduction ? "info" : "debug"),
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    isProduction
      ? winston.format.json()
      : winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.printf(({ timestamp, level, message, stack }) => {
            const base = `${timestamp} ${level}: ${message}`;
            return stack ? `${base}\n${stack}` : base;
          })
        )
  ),
  transports: [new winston.transports.Console()],
});

export default logger;