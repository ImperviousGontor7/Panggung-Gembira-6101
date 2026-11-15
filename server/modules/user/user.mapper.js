// ======================================================
// USER MAPPER
// ======================================================

export function mapUser(user) {
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

export function mapUserList(result) {
  if (!result) {
    return {
      items: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
      },
    };
  }

  return {
    items: Array.isArray(result.items)
      ? result.items.map(mapUser)
      : [],

    pagination: {
      page: result.pagination?.page ?? 1,
      limit: result.pagination?.limit ?? 20,
      total: result.pagination?.total ?? 0,
      totalPages:
        result.pagination?.totalPages ?? 0,
    },
  };
}

export function mapUserForAuth(user) {
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

export function mapUserRole(user) {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    role: user.role,
  };
}

export default {
  mapUser,
  mapUserList,
  mapUserForAuth,
  mapUserRole,
};