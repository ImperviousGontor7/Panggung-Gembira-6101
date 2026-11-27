import { afterAll, beforeAll, describe, expect, it } from "vitest";

import request from "supertest";

import { createHash, randomBytes, randomUUID } from "node:crypto";

import app from "../../app.js";
import prisma from "../../config/prisma.js";

import {
  comparePassword,
} from "../../utils/password.js";

// ======================================================
// INTEGRATION TEST CONFIGURATION
// ======================================================

// Integration test tidak dijalankan secara otomatis.
// Aktifkan secara eksplisit dengan:
//
// RUN_AUTH_INTEGRATION=true npx vitest run tests/api/auth.test.js

const integrationEnabled = process.env.RUN_AUTH_INTEGRATION === "true";

// ======================================================
// TEMPORARY TEST USER
// ======================================================

const uniqueId = randomUUID().replaceAll("-", "");

const testUser = {
  username: `auth_${uniqueId.slice(0, 20)}`,

  email: `auth.integration.${uniqueId}@example.invalid`,

  password: randomBytes(24).toString("base64url"),

  fullName: "Authentication Integration Test",
};

// ======================================================
// TEST STATE
// ======================================================

let databaseConnected = false;

let testUserId = null;

let accessToken = null;

let registerRefreshCookie = null;

let currentRefreshCookie = null;

// ======================================================
// HELPERS
// ======================================================

function extractRefreshCookie(response) {
  const headers = response.headers["set-cookie"] ?? [];

  const cookies = Array.isArray(headers) ? headers : [headers];

  const cookie = cookies.find(
    (value) => typeof value === "string" && value.startsWith("refreshToken="),
  );

  return cookie ? cookie.split(";")[0] : null;
}

function hashRefreshCookie(cookie) {
  if (typeof cookie !== "string" || !cookie.startsWith("refreshToken=")) {
    throw new Error("Refresh cookie tidak valid.");
  }

  const token = cookie.slice("refreshToken=".length);

  return createHash("sha256").update(token, "utf8").digest("hex");
}

function expectSuccessfulResponse(response, statusCode = 200) {
  expect(response.status).toBe(statusCode);
  expect(response.body.success).toBe(true);
}

async function findTestUser() {
  if (!testUserId) {
    return null;
  }

  return prisma.user.findUnique({
    where: {
      id: testUserId,
    },
  });
}

// ======================================================
// AUTHENTICATION INTEGRATION TESTS
// ======================================================

describe.skipIf(!integrationEnabled)(
  "Authentication API Integration",

  () => {
    // ==================================================
    // DATABASE SETUP
    // ==================================================

    beforeAll(async () => {
      await prisma.$connect();

      databaseConnected = true;
    }, 30_000);

    // ==================================================
    // DATABASE CLEANUP
    // ==================================================

    afterAll(async () => {
      if (!databaseConnected) {
        return;
      }

      try {
        // Hanya menghapus akun sementara yang dibuat
        // oleh pengujian ini melalui email unik.
        await prisma.user.deleteMany({
          where: {
            email: testUser.email,
          },
        });
      } finally {
        await prisma.$disconnect();
      }
    }, 30_000);

    // ==================================================
    // TEST 1: REGISTER
    // ==================================================

    it("should register a new user in Supabase", async () => {
      const response = await request(app).post("/api/auth/register").send({
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
        fullName: testUser.fullName,
      });

      expectSuccessfulResponse(response, 201);

      const user = response.body.data.user;

      expect(user).toBeDefined();

      expect(user).toMatchObject({
        username: testUser.username,
        email: testUser.email,
        fullName: testUser.fullName,
        role: "USER",
        status: "ACTIVE",
        isActive: true,
      });

      expect(user.password).toBeUndefined();

      testUserId = user.id;

      registerRefreshCookie = extractRefreshCookie(response);

      expect(registerRefreshCookie).toBeTruthy();

      expect(response.headers["set-cookie"]?.[0]).toContain("HttpOnly");

      // ----------------------------------------------
      // Verify actual PostgreSQL data
      // ----------------------------------------------

      const savedUser = await findTestUser();

      expect(savedUser).not.toBeNull();

      expect(savedUser.password).not.toBe(testUser.password);

      expect(await comparePassword(testUser.password, savedUser.password)).toBe(
        true,
      );

      // Refresh Token must be stored as SHA-256 hash.
      expect(savedUser.refreshToken).toBe(
        hashRefreshCookie(registerRefreshCookie),
      );
    }, 30_000);

    // ==================================================
    // TEST 2: LOGIN
    // ==================================================

    it("should reject invalid credentials and login successfully", async () => {
      const invalidResponse = await request(app).post("/api/auth/login").send({
        email: testUser.email,
        password: "incorrect-password",
      });

      expect(invalidResponse.status).toBe(401);

      // ----------------------------------------------
      // Login using valid credentials
      // ----------------------------------------------

      const response = await request(app).post("/api/auth/login").send({
        email: testUser.email,
        password: testUser.password,
      });

      expectSuccessfulResponse(response);

      const user = response.body.data.user;

      expect(user.id).toBe(testUserId);

      accessToken = response.body.data.accessToken;

      expect(accessToken).toEqual(expect.any(String));

      currentRefreshCookie = extractRefreshCookie(response);

      expect(currentRefreshCookie).toBeTruthy();

      // ----------------------------------------------
      // Verify current session in PostgreSQL
      // ----------------------------------------------

      const savedUser = await findTestUser();

      expect(savedUser.refreshToken).toBe(
        hashRefreshCookie(currentRefreshCookie),
      );

      // Login must replace the previous refresh token.
      expect(currentRefreshCookie).not.toBe(registerRefreshCookie);
    }, 30_000);

    // ==================================================
    // TEST 3: CURRENT USER
    // ==================================================

    it("should retrieve the authenticated user through /me", async () => {
      const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${accessToken}`);

      expectSuccessfulResponse(response);

      expect(response.body.data.user).toMatchObject({
        id: testUserId,
        email: testUser.email,
        username: testUser.username,
        role: "USER",
      });
    }, 30_000);

    // ==================================================
    // TEST 4: REFRESH TOKEN ROTATION
    // ==================================================

    it("should rotate refresh tokens and reject replay without revoking the latest session", async () => {
      const previousCookie = currentRefreshCookie;

      // ----------------------------------------------
      // Refresh using current token
      // ----------------------------------------------

      const response = await request(app)
        .post("/api/auth/refresh")
        .set("Cookie", previousCookie);

      expectSuccessfulResponse(response);

      const nextCookie = extractRefreshCookie(response);

      expect(nextCookie).toBeTruthy();

      // Every refresh token must be unique.
      expect(nextCookie).not.toBe(previousCookie);

      // ----------------------------------------------
      // Verify new token hash in PostgreSQL
      // ----------------------------------------------

      const savedUser = await findTestUser();

      expect(savedUser.refreshToken).toBe(hashRefreshCookie(nextCookie));

      currentRefreshCookie = nextCookie;

      // ----------------------------------------------
      // Replay the previous refresh token
      // ----------------------------------------------

      const replayResponse = await request(app)
        .post("/api/auth/refresh")
        .set("Cookie", previousCookie);

      expect(replayResponse.status).toBe(401);

      expect(replayResponse.body.success).toBe(false);

      // ----------------------------------------------
      // Previous token must not revoke latest session
      // ----------------------------------------------

      const savedAfterReplay = await findTestUser();

      expect(savedAfterReplay.refreshToken).toBe(
        hashRefreshCookie(currentRefreshCookie),
      );

      // ----------------------------------------------
      // Verify latest token still works
      // ----------------------------------------------

      const validRefreshResponse = await request(app)
        .post("/api/auth/refresh")
        .set("Cookie", currentRefreshCookie);

      expectSuccessfulResponse(validRefreshResponse);

      const latestCookie = extractRefreshCookie(validRefreshResponse);

      expect(latestCookie).toBeTruthy();

      expect(latestCookie).not.toBe(currentRefreshCookie);

      currentRefreshCookie = latestCookie;

      const finalSavedUser = await findTestUser();

      expect(finalSavedUser.refreshToken).toBe(
        hashRefreshCookie(currentRefreshCookie),
      );
    }, 30_000);

    // ==================================================
    // TEST 5: LOGOUT
    // ==================================================

    it("should revoke the current refresh token during logout", async () => {
      const cookieAtLogout = currentRefreshCookie;

      const response = await request(app)
        .post("/api/auth/logout")
        .set("Cookie", cookieAtLogout);

      expectSuccessfulResponse(response);

      expect(response.body.data).toMatchObject({
        loggedOut: true,
      });

      // ----------------------------------------------
      // Verify token removed from PostgreSQL
      // ----------------------------------------------

      const savedUser = await findTestUser();

      expect(savedUser.refreshToken).toBeNull();

      // ----------------------------------------------
      // Old token must no longer refresh the session
      // ----------------------------------------------

      const refreshResponse = await request(app)
        .post("/api/auth/refresh")
        .set("Cookie", cookieAtLogout);

      expect(refreshResponse.status).toBe(401);

      expect(refreshResponse.body.success).toBe(false);
    }, 30_000);
  },
);
