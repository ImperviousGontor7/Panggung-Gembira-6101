import * as userRepository
  from "./user.repository.js";

import {
  hashPassword,
} from "../../utils/password.js";

// ======================================================
// CONSTANTS
// ======================================================

const ROLES = new Set([
  "SUPER_ADMIN",
  "ADMIN",
  "EDITOR",
  "USER",
]);

const USER_STATUSES = new Set([
  "ACTIVE",
  "PENDING",
  "SUSPENDED",
  "BANNED",
]);

// ======================================================
// HELPERS
// ======================================================

function normalizeString(
  value
) {
  if (
    typeof value !==
    "string"
  ) {
    return value;
  }

  const normalized =
    value.trim();

  return normalized || null;
}

function normalizeEmail(
  value
) {
  const normalized =
    normalizeString(
      value
    );

  return normalized
    ? normalized.toLowerCase()
    : null;
}

function normalizeRole(
  role
) {
  if (
    role === undefined ||
    role === null ||
    role === ""
  ) {
    return undefined;
  }

  const normalized =
    String(role)
      .trim()
      .toUpperCase();

  if (
    !ROLES.has(
      normalized
    )
  ) {
    throw new Error(
      "Invalid user role."
    );
  }

  return normalized;
}

function normalizeStatus(
  status
) {
  if (
    status === undefined ||
    status === null ||
    status === ""
  ) {
    return undefined;
  }

  const normalized =
    String(status)
      .trim()
      .toUpperCase();

  if (
    !USER_STATUSES.has(
      normalized
    )
  ) {
    throw new Error(
      "Invalid user status."
    );
  }

  return normalized;
}

function normalizeId(
  id
) {
  const normalized =
    normalizeString(id);

  if (!normalized) {
    throw new Error(
      "User ID is required."
    );
  }

  return normalized;
}

// ======================================================
// CREATE
// ======================================================

export async function createUser(
  data
) {
  const username =
    normalizeString(
      data?.username
    );

  const email =
    normalizeEmail(
      data?.email
    );

  const password =
    normalizeString(
      data?.password
    );

  if (!username) {
    throw new Error(
      "Username is required."
    );
  }

  if (!email) {
    throw new Error(
      "Email is required."
    );
  }

  if (!password) {
    throw new Error(
      "Password is required."
    );
  }

  const hashedPassword =
    await hashPassword(
      password
    );

  return userRepository.createUser(
    {
      username,

      email,

      password:
        hashedPassword,

      fullName:
        normalizeString(
          data?.fullName
        ),

      role:
        normalizeRole(
          data?.role
        ) ?? "USER",

      status:
        normalizeStatus(
          data?.status
        ) ?? "ACTIVE",
    }
  );
}

// ======================================================
// FIND
// ======================================================

export async function getUserById(
  id
) {
  return userRepository.findUserById(
    normalizeId(id),
    false
  );
}

export async function getUserByEmail(
  email,
  options = {}
) {
  const normalizedEmail =
    normalizeEmail(
      email
    );

  if (!normalizedEmail) {
    throw new Error(
      "Email is required."
    );
  }

  return userRepository.findUserByEmail(
    normalizedEmail,
    Boolean(
      options.includeSensitive
    )
  );
}

export async function getUserByUsername(
  username,
  options = {}
) {
  const normalizedUsername =
    normalizeString(
      username
    );

  if (!normalizedUsername) {
    throw new Error(
      "Username is required."
    );
  }

  return userRepository.findUserByUsername(
    normalizedUsername,
    Boolean(
      options.includeSensitive
    )
  );
}

// ======================================================
// AUTH USER
// ======================================================

export async function getAuthUserByEmail(
  email
) {
  return getUserByEmail(
    email,
    {
      includeSensitive:
        true,
    }
  );
}

export async function getAuthUserById(
  id
) {
  return userRepository.findUserById(
    normalizeId(id),
    true
  );
}

// ======================================================
// LIST
// ======================================================

export async function getUsers(
  options = {}
) {
  return userRepository.listUsers(
    {
      page:
        options.page ??
        1,

      limit:
        options.limit ??
        20,

      search:
        normalizeString(
          options.search
        ) ?? "",

      role:
        normalizeRole(
          options.role
        ),

      status:
        normalizeStatus(
          options.status
        ),
    }
  );
}

// ======================================================
// UPDATE
// ======================================================

export async function updateUser(
  id,
  data = {}
) {
  const userId =
    normalizeId(id);

  const payload = {};

  if (
    data.username !==
    undefined
  ) {
    const username =
      normalizeString(
        data.username
      );

    if (!username) {
      throw new Error(
        "Username cannot be empty."
      );
    }

    payload.username =
      username;
  }

  if (
    data.email !==
    undefined
  ) {
    const email =
      normalizeEmail(
        data.email
      );

    if (!email) {
      throw new Error(
        "Email cannot be empty."
      );
    }

    payload.email =
      email;
  }

  if (
    data.fullName !==
    undefined
  ) {
    payload.fullName =
      normalizeString(
        data.fullName
      );
  }

  if (
    data.avatar !==
    undefined
  ) {
    payload.avatar =
      normalizeString(
        data.avatar
      );
  }

  if (
    data.bio !==
    undefined
  ) {
    payload.bio =
      normalizeString(
        data.bio
      );
  }

  if (
    data.role !==
    undefined
  ) {
    payload.role =
      normalizeRole(
        data.role
      );
  }

  if (
    data.status !==
    undefined
  ) {
    payload.status =
      normalizeStatus(
        data.status
      );
  }

  if (
    data.isActive !==
    undefined
  ) {
    payload.isActive =
      Boolean(
        data.isActive
      );
  }

  if (
    data.password !==
    undefined
  ) {
    const password =
      normalizeString(
        data.password
      );

    if (!password) {
      throw new Error(
        "Password cannot be empty."
      );
    }

    payload.password =
      await hashPassword(
        password
      );
  }

  if (
    Object.keys(
      payload
    ).length === 0
  ) {
    throw new Error(
      "No user fields to update."
    );
  }

  return userRepository.updateUserById(
    userId,
    payload,
    false
  );
}

// ======================================================
// REFRESH TOKEN
// ======================================================

export async function storeRefreshTokenHash(
  userId,
  refreshTokenHash
) {
  return userRepository.updateUserRefreshToken(
    normalizeId(
      userId
    ),
    refreshTokenHash
  );
}

export async function rotateRefreshToken(
  userId,
  currentHash,
  nextHash
) {
  return userRepository.rotateRefreshToken(
    normalizeId(
      userId
    ),
    currentHash,
    nextHash
  );
}

// ======================================================
// SANITIZE
// ======================================================

export function sanitizeUser(
  user
) {
  return userRepository.sanitizeUser(
    user
  );
}

export async function countUsers(
  where = {}
) {
  return userRepository.countUsers(
    where
  );
}

export default {
  createUser,

  getUserById,
  getUserByEmail,
  getUserByUsername,

  getAuthUserByEmail,
  getAuthUserById,

  getUsers,
  updateUser,

  storeRefreshTokenHash,
  rotateRefreshToken,

  sanitizeUser,
  countUsers,
};