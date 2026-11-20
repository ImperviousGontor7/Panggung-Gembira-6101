import { z } from "zod";

// ======================================================
// USERNAME
// ======================================================

const usernameSchema = z
  .string()
  .trim()
  .min(
    3,
    "Username minimal 3 karakter.",
  )
  .max(
    30,
    "Username maksimal 30 karakter.",
  )
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username hanya boleh berisi huruf, angka, dan underscore.",
  );

// ======================================================
// EMAIL
// ======================================================

const emailSchema = z
  .string()
  .trim()
  .email(
    "Format email tidak valid.",
  )
  .max(
    254,
    "Email terlalu panjang.",
  )
  .transform(
    (value) => value.toLowerCase(),
  );

// ======================================================
// PASSWORD
// ======================================================

const passwordSchema = z
  .string()
  .min(
    8,
    "Password minimal 8 karakter.",
  )
  .max(
    128,
    "Password maksimal 128 karakter.",
  );

// ======================================================
// REGISTER
// ======================================================

export const registerSchema = z.object({
  username: usernameSchema,

  email: emailSchema,

  password: passwordSchema,

  fullName: z
    .string()
    .trim()
    .max(
      255,
      "Nama lengkap terlalu panjang.",
    )
    .optional(),
});

// ======================================================
// LOGIN
// ======================================================

export const loginSchema = z.object({
  email: emailSchema,

  password: passwordSchema,
});

// ======================================================
// EXPORT
// ======================================================

export default {
  registerSchema,
  loginSchema,
};