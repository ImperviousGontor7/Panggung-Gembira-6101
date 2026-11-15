import {
  userCreateSchema,
  userUpdateSchema,
  userListSchema,
  userRoleUpdateSchema,
  userStatusUpdateSchema,
  userActiveUpdateSchema,
} from "./user.schema.js";

// ======================================================
// GENERIC VALIDATOR
// ======================================================

function createValidator(schema) {
  return (req, res, next) => {
    const input = {
      ...(req.body || {}),
    };

    const result =
      schema.safeParse(input);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message:
          "Validation error.",
        details:
          result.error.issues.map(
            (issue) => ({
              path:
                issue.path,
              message:
                issue.message,
              code:
                issue.code,
            }),
          ),
      });
    }

    req.validated =
      req.validated || {};

    req.validated.body =
      result.data;

    req.body =
      result.data;

    return next();
  };
}

// ======================================================
// CREATE
// ======================================================

export const validateCreateUser =
  createValidator(
    userCreateSchema,
  );

// ======================================================
// UPDATE
// ======================================================

export const validateUpdateUser =
  createValidator(
    userUpdateSchema,
  );

// ======================================================
// LIST
// ======================================================

export function validateUserList(
  req,
  res,
  next,
) {
  const result =
    userListSchema.safeParse(
      req.query || {},
    );

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid user query.",
      details:
        result.error.issues.map(
          (issue) => ({
            path:
              issue.path,
            message:
              issue.message,
            code:
              issue.code,
          }),
        ),
    });
  }

  req.validated =
    req.validated || {};

  req.validated.query =
    result.data;

  return next();
}

// ======================================================
// ROLE
// ======================================================

export const validateUserRole =
  createValidator(
    userRoleUpdateSchema,
  );

// ======================================================
// STATUS
// ======================================================

export const validateUserStatus =
  createValidator(
    userStatusUpdateSchema,
  );

// ======================================================
// ACTIVE
// ======================================================

export const validateUserActive =
  createValidator(
    userActiveUpdateSchema,
  );

export default {
  validateCreateUser,
  validateUpdateUser,
  validateUserList,
  validateUserRole,
  validateUserStatus,
  validateUserActive,
};