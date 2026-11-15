import express from "express";

import authRoutes from "../auth/auth.routes.js";

const router = express.Router();

// ======================================================
// AUTHENTICATION
// ======================================================

router.use(
  "/auth",
  authRoutes,
);

export default router;