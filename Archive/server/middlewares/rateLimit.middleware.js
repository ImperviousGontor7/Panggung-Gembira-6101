import rateLimit from "express-rate-limit";

// ======================================================
// COMMON OPTIONS
// ======================================================

const commonOptions = {
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message:
        "Terlalu banyak request. Silakan coba lagi nanti.",
    });
  },
};

// ======================================================
// GENERAL / API RATE LIMIT
// ======================================================

export const generalRateLimit = rateLimit({
  ...commonOptions,

  windowMs: 15 * 60 * 1000,

  limit: 300,
});

// Alias untuk rate limiter utama API.
//
// server/app.js menggunakan:
// app.use("/api", apiRateLimiter, routes);
//
// Jadi apiRateLimiter menggunakan konfigurasi
// generalRateLimit yang sama.

export const apiRateLimiter = generalRateLimit;

// ======================================================
// AUTH RATE LIMIT
// ======================================================

export const authRateLimit = rateLimit({
  ...commonOptions,

  windowMs: 15 * 60 * 1000,

  limit: 10,

  skipSuccessfulRequests: true,
});

// ======================================================
// UPLOAD RATE LIMIT
// ======================================================

export const uploadRateLimit = rateLimit({
  ...commonOptions,

  windowMs: 15 * 60 * 1000,

  limit: 50,
});

// ======================================================
// DEFAULT
// ======================================================

export default generalRateLimit;