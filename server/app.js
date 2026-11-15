import express from "express";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import routes from "./routes/routes.index.js";

import notFound from "./middlewares/notFound.middleware.js";

import errorMiddleware from "./middlewares/error.middleware.js";

import {
  apiRateLimiter,
} from "./middlewares/rateLimit.middleware.js";

import corsMiddleware from "./config/cors.js";
import { securityOptions } from "./config/security.js";
import { setupSwagger } from "./config/swagger.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.resolve(
  __dirname,
  "uploads",
);

fs.mkdirSync(uploadsDir, {
  recursive: true,
});

app.set("trust proxy", 1);
app.disable("x-powered-by");

// ======================================================
// SECURITY
// ======================================================

app.use(
  helmet(securityOptions),
);

app.use(corsMiddleware);

app.use(
  compression(),
);

app.use(
  cookieParser(),
);

// ======================================================
// BODY PARSERS
// ======================================================

app.use(
  express.json({
    limit: "1mb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  }),
);

// ======================================================
// STATIC FILES
// ======================================================

app.use(
  "/uploads",
  express.static(
    uploadsDir,
    {
      index: false,
      etag: true,
      maxAge: "7d",
      fallthrough: true,

      setHeaders: (res) => {
        res.setHeader(
          "X-Content-Type-Options",
          "nosniff",
        );

        res.setHeader(
          "Content-Disposition",
          "inline",
        );
      },
    },
  ),
);

// ======================================================
// SWAGGER
// ======================================================

setupSwagger(app);

// ======================================================
// ROOT
// ======================================================

app.get(
  "/",
  (req, res) => {
    return res
      .status(200)
      .json({
        success: true,
        message:
          "Impervious API is running",
        docs: "/api-docs",
      });
  },
);

// ======================================================
// API ROUTES
// ======================================================

app.use(
  "/api",
  apiRateLimiter,
  routes,
);

// ======================================================
// 404
// ======================================================

app.use(
  notFound,
);

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use(
  errorMiddleware,
);

export default app;