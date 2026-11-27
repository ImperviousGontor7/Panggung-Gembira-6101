import prisma from "../../config/prisma.js";

// ======================================================
// SELECTS
// ======================================================

export const userPublicSelect = Object.freeze({
  id: true,
  username: true,
  email: true,
  fullName: true,
  avatar: true,
  bio: true,
  role: true,
  status: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
});

export const userAuthSelect = Object.freeze({
  ...userPublicSelect,

  password: true,
  refreshToken: true,
  deletedAt: true,
});

// ======================================================
// FIND
// ======================================================

export async function findUserById(id, includeSensitive = false) {
  if (!id) {
    return null;
  }

  return prisma.user.findUnique({
    where: {
      id,
    },

    select: includeSensitive ? userAuthSelect : userPublicSelect,
  });
}

export async function findUserByEmail(email, includeSensitive = false) {
  if (!email) {
    return null;
  }

  return prisma.user.findUnique({
    where: {
      email: String(email).trim().toLowerCase(),
    },

    select: includeSensitive ? userAuthSelect : userPublicSelect,
  });
}

export async function findUserByUsername(username, includeSensitive = false) {
  if (!username) {
    return null;
  }

  return prisma.user.findUnique({
    where: {
      username: String(username).trim(),
    },

    select: includeSensitive ? userAuthSelect : userPublicSelect,
  });
}

// ======================================================
// LIST
// ======================================================

export async function listUsers({
  page = 1,
  limit = 20,
  search = "",
  role,
  status,
  isActive,
} = {}) {
  const safePage = Math.max(Number.parseInt(page, 10) || 1, 1);

  const safeLimit = Math.min(
    Math.max(Number.parseInt(limit, 10) || 20, 1),
    100,
  );

  const where = {
    deletedAt: null,
  };

  const normalizedSearch = String(search || "").trim();

  if (normalizedSearch) {
    where.OR = [
      {
        username: {
          contains: normalizedSearch,
          mode: "insensitive",
        },
      },
      {
        email: {
          contains: normalizedSearch,
          mode: "insensitive",
        },
      },
      {
        fullName: {
          contains: normalizedSearch,
          mode: "insensitive",
        },
      },
    ];
  }

  if (role) {
    where.role = role;
  }

  if (status) {
    where.status = status;
  }

  if (typeof isActive === "boolean") {
    where.isActive = isActive;
  }

  const skip = (safePage - 1) * safeLimit;

  const [items, total] = await Promise.all([
    prisma.user.findMany({
      where,

      select: userPublicSelect,

      orderBy: {
        createdAt: "desc",
      },

      skip,
      take: safeLimit,
    }),

    prisma.user.count({
      where,
    }),
  ]);

  return {
    items,

    pagination: {
      page: safePage,

      limit: safeLimit,

      total,

      totalPages: Math.ceil(total / safeLimit),
    },
  };
}

// ======================================================
// CREATE
// ======================================================

export async function createUser(data) {
  return prisma.user.create({
    data,

    select: userPublicSelect,
  });
}

// ======================================================
// UPDATE
// ======================================================

export async function updateUserById(id, data, includeSensitive = false) {
  return prisma.user.update({
    where: {
      id,
    },

    data,

    select: includeSensitive ? userAuthSelect : userPublicSelect,
  });
}

// ======================================================
// SOFT DELETE
// ======================================================

export async function softDeleteUser(id) {
  return prisma.user.update({
    where: {
      id,
    },

    data: {
      deletedAt: new Date(),

      isActive: false,

      status: "BANNED",
    },

    select: userPublicSelect,
  });
}

// ======================================================
// RESTORE
// ======================================================

export async function restoreUser(id) {
  return prisma.user.update({
    where: {
      id,
    },

    data: {
      deletedAt: null,

      isActive: true,

      status: "ACTIVE",
    },

    select: userPublicSelect,
  });
}

// ======================================================
// REFRESH TOKEN
// ======================================================

export async function updateUserRefreshToken(userId, refreshTokenHash) {
  return prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      refreshToken: refreshTokenHash,
    },

    select: {
      id: true,
      refreshToken: true,
    },
  });
}

export async function rotateRefreshToken(
  userId,
  currentHash,
  nextHash,
) {
  if (
    !userId ||
    !currentHash ||
    !nextHash
  ) {
    return false;
  }

  const result =
    await prisma.user.updateMany({
      where: {
        id: userId,
        refreshToken: currentHash,
        deletedAt: null,
        isActive: true,
        status: "ACTIVE",
      },

      data: {
        refreshToken: nextHash,
      },
    });

  return result.count === 1;
}

export async function revokeRefreshToken(
  userId,
  refreshTokenHash,
) {
  if (!userId || !refreshTokenHash) {
    return false;
  }

  const result = await prisma.user.updateMany({
    where: {
      id: userId,
      refreshToken: refreshTokenHash,
    },

    data: {
      refreshToken: null,
    },
  });

  return result.count === 1;
}

// ======================================================
// COUNTS
// ======================================================

export async function countUsers(where = {}) {
  return prisma.user.count({
    where,
  });
}

// ======================================================
// SANITIZE
// ======================================================

export function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user.id,

    username: user.username,

    email: user.email,

    fullName: user.fullName ?? null,

    avatar: user.avatar ?? null,

    bio: user.bio ?? null,

    role: user.role,

    status: user.status,

    isActive: user.isActive,

    createdAt: user.createdAt ?? null,

    updatedAt: user.updatedAt ?? null,
  };
}

export default {
  findUserById,
  findUserByEmail,
  findUserByUsername,

  listUsers,

  createUser,
  updateUserById,

  softDeleteUser,
  restoreUser,

  updateUserRefreshToken,
  rotateRefreshToken,
  revokeRefreshToken,

  countUsers,
  sanitizeUser,
};