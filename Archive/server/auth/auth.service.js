import crypto from "node:crypto";

import { MESSAGE } from "../constants/message.js";
import { ROLES } from "../constants/roles.js";

import {
  comparePassword,
  hashPassword,
} from "../utils/password.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

import {
  createUser,
  findUserByEmail,
  findUserByUsername,
  findUserById,
  updateUserRefreshToken,
  rotateRefreshToken,
} from "../modules/user/user.repository.js";

const AUTH_STATUS = "ACTIVE";

function createAuthError(
  message,
  statusCode = 400,
) {
  const err = new Error(message);

  err.statusCode = statusCode;

  return err;
}

function normalizeText(value) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function normalizeEmail(value) {
  return normalizeText(value).toLowerCase();
}

function sha256(value) {
  return crypto
    .createHash("sha256")
    .update(value, "utf8")
    .digest("hex");
}

function safeCompareHash(first, second) {
  if (
    typeof first !== "string" ||
    typeof second !== "string"
  ) {
    return false;
  }

  const a = Buffer.from(first, "utf8");
  const b = Buffer.from(second, "utf8");

  if (a.length !== b.length) {
    return false;
  }

  return crypto.timingSafeEqual(a, b);
}

function validateRegisterInput({
  username,
  email,
  password,
}) {
  if (!username) {
    throw createAuthError(
      "Username wajib diisi.",
      400,
    );
  }

  if (!email) {
    throw createAuthError(
      "Email wajib diisi.",
      400,
    );
  }

  if (!password) {
    throw createAuthError(
      "Password wajib diisi.",
      400,
    );
  }
}

function buildTokenPayload(user) {
  return {
    sub: user.id,
  };
}

function buildTokenPair(user) {
  const payload = buildTokenPayload(user);

  return {
    accessToken:
      generateAccessToken(payload),

    refreshToken:
      generateRefreshToken(payload),
  };
}

/**
 * Remove sensitive/internal fields before
 * returning user data outside the auth layer.
 */
function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  const safeUser = {
    ...user,
  };

  delete safeUser.password;
  delete safeUser.refreshToken;
  delete safeUser.deletedAt;

  return safeUser;
}

async function persistRefreshToken(
  userId,
  refreshToken,
) {
  const hash = sha256(refreshToken);

  await updateUserRefreshToken(
    userId,
    hash,
  );

  return hash;
}

async function createSession(user) {
  const tokens = buildTokenPair(user);

  await persistRefreshToken(
    user.id,
    tokens.refreshToken,
  );

  return {
    user: sanitizeUser(user),

    accessToken:
      tokens.accessToken,

    refreshToken:
      tokens.refreshToken,
  };
}

function assertActiveUser(user) {
  if (!user) {
    throw createAuthError(
      MESSAGE.AUTH.USER_NOT_FOUND,
      401,
    );
  }

  if (
    user.deletedAt ||
    user.isActive === false ||
    user.status !== AUTH_STATUS
  ) {
    throw createAuthError(
      MESSAGE.AUTH.USER_DISABLED,
      403,
    );
  }
}

// ======================================================
// REGISTER
// ======================================================

export async function registerUser({
  username,
  email,
  password,
  fullName = "",
}) {
  const normalizedUsername =
    normalizeText(username);

  const normalizedEmail =
    normalizeEmail(email);

  const normalizedPassword =
    typeof password === "string"
      ? password
      : "";

  const normalizedFullName =
    normalizeText(fullName) || null;

  validateRegisterInput({
    username:
      normalizedUsername,

    email:
      normalizedEmail,

    password:
      normalizedPassword,
  });

  const existingEmail =
    await findUserByEmail(
      normalizedEmail,
      true,
    );

  if (existingEmail) {
    throw createAuthError(
      MESSAGE.AUTH.EMAIL_ALREADY_USED,
      409,
    );
  }

  const existingUsername =
    await findUserByUsername(
      normalizedUsername,
      true,
    );

  if (existingUsername) {
    throw createAuthError(
      MESSAGE.AUTH.USERNAME_ALREADY_USED,
      409,
    );
  }

  const passwordHash =
    await hashPassword(
      normalizedPassword,
    );

  const createdUser =
    await createUser({
      username:
        normalizedUsername,

      email:
        normalizedEmail,

      password:
        passwordHash,

      fullName:
        normalizedFullName,

      role:
        ROLES.USER,

      status:
        AUTH_STATUS,

      isActive:
        true,
    });

  const user =
    await findUserById(
      createdUser.id,
      false,
    );

  if (!user) {
    throw new Error(
      "User berhasil dibuat tetapi tidak dapat diambil kembali.",
    );
  }

  return createSession(user);
}

// ======================================================
// LOGIN
// ======================================================

export async function loginUser({
  email,
  password,
}) {
  const normalizedEmail =
    normalizeEmail(email);

  const normalizedPassword =
    typeof password === "string"
      ? password
      : "";

  if (
    !normalizedEmail ||
    !normalizedPassword
  ) {
    throw createAuthError(
      MESSAGE.AUTH.INVALID_CREDENTIALS,
      401,
    );
  }

  const user =
    await findUserByEmail(
      normalizedEmail,
      true,
    );

  if (!user) {
    throw createAuthError(
      MESSAGE.AUTH.INVALID_CREDENTIALS,
      401,
    );
  }

  assertActiveUser(user);

  const passwordValid =
    await comparePassword(
      normalizedPassword,
      user.password,
    );

  if (!passwordValid) {
    throw createAuthError(
      MESSAGE.AUTH.INVALID_CREDENTIALS,
      401,
    );
  }

  const publicUser =
    await findUserById(
      user.id,
      false,
    );

  if (!publicUser) {
    throw createAuthError(
      MESSAGE.AUTH.USER_NOT_FOUND,
      401,
    );
  }

  return createSession(
    publicUser,
  );
}

// ======================================================
// REFRESH
// ======================================================

export async function refreshUserSession(
  refreshToken,
) {
  if (
    typeof refreshToken !== "string" ||
    !refreshToken.trim()
  ) {
    throw createAuthError(
      MESSAGE.AUTH.UNAUTHORIZED,
      401,
    );
  }

  let payload;

  try {
    payload =
      verifyRefreshToken(
        refreshToken,
      );
  } catch (err) {
    throw createAuthError(
      err?.name ===
        "TokenExpiredError"
        ? MESSAGE.AUTH.TOKEN_EXPIRED
        : MESSAGE.AUTH.TOKEN_INVALID,
      401,
    );
  }

  const userId =
    payload?.sub;

  if (!userId) {
    throw createAuthError(
      MESSAGE.AUTH.TOKEN_INVALID,
      401,
    );
  }

  const user =
    await findUserById(
      userId,
      true,
    );

  assertActiveUser(user);

  const incomingHash =
    sha256(refreshToken);

  if (
    !user.refreshToken ||
    !safeCompareHash(
      user.refreshToken,
      incomingHash,
    )
  ) {
    await updateUserRefreshToken(
      user.id,
      null,
    );

    throw createAuthError(
      MESSAGE.AUTH.TOKEN_INVALID,
      401,
    );
  }

  const publicUser =
    await findUserById(
      user.id,
      false,
    );

  if (!publicUser) {
    throw createAuthError(
      MESSAGE.AUTH.USER_NOT_FOUND,
      401,
    );
  }

  const tokens =
    buildTokenPair(
      publicUser,
    );

  const newHash =
    sha256(
      tokens.refreshToken,
    );

  const rotated =
    await rotateRefreshToken(
      user.id,
      incomingHash,
      newHash,
    );

  if (!rotated) {
    throw createAuthError(
      MESSAGE.AUTH.TOKEN_INVALID,
      401,
    );
  }

  return {
    user:
      sanitizeUser(
        publicUser,
      ),

    accessToken:
      tokens.accessToken,

    refreshToken:
      tokens.refreshToken,
  };
}

// ======================================================
// CURRENT USER
// ======================================================

export async function getCurrentUser(
  user,
) {
  if (!user) {
    throw createAuthError(
      MESSAGE.AUTH.UNAUTHORIZED,
      401,
    );
  }

  return sanitizeUser(user);
}

// ======================================================
// LOGOUT
// ======================================================

export async function logoutUser({
  userId = null,
  refreshToken = null,
}) {
  let resolvedUserId =
    userId;

  if (
    !resolvedUserId &&
    refreshToken
  ) {
    try {
      const payload =
        verifyRefreshToken(
          refreshToken,
        );

      resolvedUserId =
        payload?.sub || null;
    } catch {
      // Logout tetap idempotent.
    }
  }

  if (resolvedUserId) {
    await updateUserRefreshToken(
      resolvedUserId,
      null,
    );
  }

  return {
    loggedOut: true,
  };
}