import { isValidRole } from "../constants/roles.js";

// ======================================================
// REQUIRE ROLE
// ======================================================

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    // Pastikan user sudah terautentikasi
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const userRole = req.user.role;

    // Pastikan role user valid
    if (!isValidRole(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Invalid user role.",
      });
    }

    // Jika tidak ada role yang diberikan,
    // middleware tidak membatasi akses berdasarkan role.
    if (allowedRoles.length === 0) {
      return next();
    }

    // Pastikan role user termasuk role yang diizinkan
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action.",
      });
    }

    return next();
  };
}

// ======================================================
// REQUIRE ANY ROLE
// ======================================================

export function requireAnyRole(roles = []) {
  return requireRole(...roles);
}