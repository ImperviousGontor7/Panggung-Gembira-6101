export const ROLES =
  Object.freeze({
    SUPER_ADMIN:
      "SUPER_ADMIN",

    ADMIN:
      "ADMIN",

    EDITOR:
      "EDITOR",

    USER:
      "USER",
  });

export const AUTHENTICATED_ROLES =
  Object.freeze([
    ROLES.SUPER_ADMIN,

    ROLES.ADMIN,

    ROLES.EDITOR,

    ROLES.USER,
  ]);

export const ADMIN_ROLES =
  Object.freeze([
    ROLES.SUPER_ADMIN,

    ROLES.ADMIN,
  ]);

export const CMS_ROLES =
  Object.freeze([
    ROLES.SUPER_ADMIN,

    ROLES.ADMIN,

    ROLES.EDITOR,
  ]);

export const USER_ROLES =
  Object.freeze([
    ROLES.USER,
  ]);

export function isValidRole(
  role,
) {
  return AUTHENTICATED_ROLES.includes(
    role,
  );
}

export function isAdminRole(
  role,
) {
  return ADMIN_ROLES.includes(
    role,
  );
}

export function isCmsRole(
  role,
) {
  return CMS_ROLES.includes(
    role,
  );
}

export default {
  ROLES,

  AUTHENTICATED_ROLES,

  ADMIN_ROLES,

  CMS_ROLES,

  USER_ROLES,

  isValidRole,

  isAdminRole,

  isCmsRole,
};