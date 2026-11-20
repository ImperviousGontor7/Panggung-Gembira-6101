import jwt from "jsonwebtoken";

import { APP_ENV } from "../config/env.js";

export const JWT_ALGORITHM =
  "HS256";

function assertSecret(
  secret,
  name,
) {
  if (
    typeof secret !== "string" ||
    !secret
  ) {
    throw new Error(
      `${name} is not configured.`,
    );
  }
}

function signToken(
  payload,
  secret,
  expiresIn,
) {
  assertSecret(
    secret,
    "JWT secret",
  );

  if (
    !payload ||
    typeof payload !== "object"
  ) {
    throw new TypeError(
      "JWT payload must be an object.",
    );
  }

  return jwt.sign(
    payload,
    secret,
    {
      algorithm:
        JWT_ALGORITHM,
      expiresIn,
    },
  );
}

export function generateAccessToken(
  payload,
) {
  return signToken(
    payload,
    APP_ENV.JWT_ACCESS_SECRET,
    APP_ENV.JWT_ACCESS_EXPIRES_IN,
  );
}

export function generateRefreshToken(
  payload,
) {
  return signToken(
    payload,
    APP_ENV.JWT_REFRESH_SECRET,
    APP_ENV.JWT_REFRESH_EXPIRES_IN,
  );
}

export function verifyAccessToken(
  token,
) {
  assertSecret(
    APP_ENV.JWT_ACCESS_SECRET,
    "JWT_ACCESS_SECRET",
  );

  if (
    typeof token !== "string" ||
    !token
  ) {
    throw new TypeError(
      "Access token is required.",
    );
  }

  return jwt.verify(
    token,
    APP_ENV.JWT_ACCESS_SECRET,
    {
      algorithms: [
        JWT_ALGORITHM,
      ],
    },
  );
}

export function verifyRefreshToken(
  token,
) {
  assertSecret(
    APP_ENV.JWT_REFRESH_SECRET,
    "JWT_REFRESH_SECRET",
  );

  if (
    typeof token !== "string" ||
    !token
  ) {
    throw new TypeError(
      "Refresh token is required.",
    );
  }

  return jwt.verify(
    token,
    APP_ENV.JWT_REFRESH_SECRET,
    {
      algorithms: [
        JWT_ALGORITHM,
      ],
    },
  );
}

// Backward compatibility
export const verifyToken =
  verifyAccessToken;

export function decodeToken(
  token,
) {
  if (
    typeof token !== "string" ||
    !token
  ) {
    return null;
  }

  return jwt.decode(token);
}

export function getTokenExpiration(
  token,
) {
  const decoded =
    decodeToken(token);

  if (
    !decoded ||
    typeof decoded !==
      "object" ||
    typeof decoded.exp !==
      "number"
  ) {
    return null;
  }

  return new Date(
    decoded.exp * 1000,
  );
}

export function isTokenExpired(
  token,
) {
  const expiration =
    getTokenExpiration(token);

  if (!expiration) {
    return true;
  }

  return (
    expiration.getTime() <=
    Date.now()
  );
}