import { z } from "zod";

import {
  USER_LIMITS,
  USER_ROLES,
  USER_STATUSES,
} from "./user.constants.js";

// ======================================================
// PRIMITIVES
// ======================================================

export const userIdSchema =
  z
    .string()
    .trim()
    .min(1, "User ID is required.");

export const usernameSchema =
  z
    .string()
    .trim()
    .min(
      USER_LIMITS.USERNAME_MIN,
      `Username must be at least ${USER_LIMITS.USERNAME_MIN} characters.`,
    )
    .max(
      USER_LIMITS.USERNAME_MAX,
      `Username must not exceed ${USER_LIMITS.USERNAME_MAX} characters.`,
    )
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username may only contain letters, numbers, and underscores.",
    );

export const emailSchema =
  z
    .string()
    .trim()
    .email("Invalid email address.")
    .max(254, "Email is too long.")
    .transform((value) =>
      value.toLowerCase(),
    );

export const passwordSchema =
  z
    .string()
    .min(
      USER_LIMITS.PASSWORD_MIN,
      `Password must be at least ${USER_LIMITS.PASSWORD_MIN} characters.`,
    )
    .max(
      USER_LIMITS.PASSWORD_MAX,
      `Password must not exceed ${USER_LIMITS.PASSWORD_MAX} characters.`,
    );

export const roleSchema =
  z.enum(USER_ROLES);

export const statusSchema =
  z.enum(USER_STATUSES);

export const fullNameSchema =
  z
    .string()
    .trim()
    .max(
      USER_LIMITS.FULL_NAME_MAX,
      "Full name is too long.",
    )
    .nullable()
    .optional();

export const avatarSchema =
  z
    .string()
    .trim()
    .max(
      2048,
      "Avatar URL is too long.",
    )
    .nullable()
    .optional();

export const bioSchema =
  z
    .string()
    .trim()
    .max(
      USER_LIMITS.BIO_MAX,
      "Bio is too long.",
    )
    .nullable()
    .optional();

// ======================================================
// CREATE
// ======================================================

export const userCreateSchema =
  z.object({
    username:
      usernameSchema,

    email:
      emailSchema,

    password:
      passwordSchema,

    fullName:
      fullNameSchema,

    avatar:
      avatarSchema,

    bio:
      bioSchema,

    isActive:
      z.boolean().optional(),

    role:
      roleSchema.optional(),

    status:
      statusSchema.optional(),
  });

// ======================================================
// UPDATE
// ======================================================

export const userUpdateSchema =
  z
    .object({
      username:
        usernameSchema.optional(),

      email:
        emailSchema.optional(),

      password:
        passwordSchema.optional(),

      fullName:
        fullNameSchema,

      avatar:
        avatarSchema,

      bio:
        bioSchema,

      isActive:
        z.boolean().optional(),

      role:
        roleSchema.optional(),

      status:
        statusSchema.optional(),
    })
    .refine(
      (data) =>
        Object.keys(data).length > 0,
      {
        message:
          "At least one field must be provided.",
      },
    );

// ======================================================
// LIST
// ======================================================

export const userListSchema =
  z.object({
    page:
      z.coerce
        .number()
        .int()
        .min(1)
        .default(1),

    limit:
      z.coerce
        .number()
        .int()
        .min(1)
        .max(
          USER_LIMITS.MAX_PAGE_SIZE,
        )
        .default(
          USER_LIMITS.DEFAULT_PAGE_SIZE,
        ),

    search:
      z
        .string()
        .trim()
        .max(100)
        .optional()
        .default(""),

    role:
      roleSchema.optional(),

    status:
      statusSchema.optional(),
  });

// ======================================================
// ROLE UPDATE
// ======================================================

export const userRoleUpdateSchema =
  z.object({
    role:
      roleSchema,
  });

// ======================================================
// STATUS UPDATE
// ======================================================

export const userStatusUpdateSchema =
  z.object({
    status:
      statusSchema,
  });

// ======================================================
// ACTIVE STATE
// ======================================================

export const userActiveUpdateSchema =
  z.object({
    isActive:
      z.boolean(),
  });

export default {
  userIdSchema,
  usernameSchema,
  emailSchema,
  passwordSchema,
  roleSchema,
  statusSchema,
  fullNameSchema,
  avatarSchema,
  bioSchema,
  userCreateSchema,
  userUpdateSchema,
  userListSchema,
  userRoleUpdateSchema,
  userStatusUpdateSchema,
  userActiveUpdateSchema,
};