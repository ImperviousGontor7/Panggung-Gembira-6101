import { Router } from "express";

import {
  register,
  login,
  refresh,
  me,
  logout,
} from "./auth.controller.js";

import authMiddleware from "./auth.middleware.js";

import { validate } from "../middlewares/validate.middleware.js";
import {
  registerSchema,
  loginSchema,
} from "./auth.validator.js";

import { authRateLimit } from "../middlewares/rateLimit.middleware.js";

const router = Router();

// ======================================================
// PUBLIC
// ======================================================

router.post(
  "/register",
  authRateLimit,
  validate(registerSchema),
  register,
);

router.post(
  "/login",
  authRateLimit,
  validate(loginSchema),
  login,
);

router.post(
  "/refresh",
  refresh,
);

// ======================================================
// LOGOUT
// ======================================================

router.post(
  "/logout",
  logout,
);

// ======================================================
// PROTECTED
// ======================================================

router.get(
  "/me",
  authMiddleware,
  me,
);

export default router;