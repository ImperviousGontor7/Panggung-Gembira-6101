// ======================================================
// USER MODULE CONSTANTS
// ======================================================

export const USER_DEFAULTS = Object.freeze({
  ROLE: "USER",
  STATUS: "ACTIVE",
  IS_ACTIVE: true,
});

export const USER_ROLES = Object.freeze([
  "SUPER_ADMIN",
  "ADMIN",
  "EDITOR",
  "USER",
]);

export const USER_STATUSES = Object.freeze([
  "ACTIVE",
  "PENDING",
  "SUSPENDED",
  "BANNED",
]);

export const USER_LIMITS = Object.freeze({
  USERNAME_MIN: 3,
  USERNAME_MAX: 30,

  FULL_NAME_MAX: 255,

  BIO_MAX: 2000,

  PASSWORD_MIN: 8,
  PASSWORD_MAX: 128,

  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE_SIZE: 20,
});

export const USER_SEARCH_FIELDS = Object.freeze([
  "username",
  "email",
  "fullName",
]);

export const USER_SELECT_FIELDS = Object.freeze({
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

export const USER_SENSITIVE_FIELDS = Object.freeze([
  "password",
  "refreshToken",
  "deletedAt",
]);

export default {
  USER_DEFAULTS,
  USER_ROLES,
  USER_STATUSES,
  USER_LIMITS,
  USER_SEARCH_FIELDS,
  USER_SELECT_FIELDS,
  USER_SENSITIVE_FIELDS,
};