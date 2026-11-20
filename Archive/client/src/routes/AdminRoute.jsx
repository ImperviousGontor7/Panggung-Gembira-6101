import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../context/useAuth";

// ======================================================
// CMS ROLES
// ======================================================

const CMS_ROLES =
  new Set([
    "SUPER_ADMIN",
    "ADMIN",
    "EDITOR",
  ]);

// ======================================================
// COMPONENT
// ======================================================

export default function AdminRoute() {
  const {
    user,
    loading,
  } = useAuth();

  const location =
    useLocation();

  // ====================================================
  // AUTH LOADING
  // ====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-main text-white">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-white/40">
            Authentication
          </p>

          <p className="mt-2 text-white/70">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // ====================================================
  // NOT AUTHENTICATED
  // ====================================================

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from:
            location.pathname +
            location.search,
        }}
      />
    );
  }

  // ====================================================
  // NOT AUTHORIZED
  // ====================================================

  if (
    !CMS_ROLES.has(
      user.role
    )
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // ====================================================
  // AUTHORIZED
  // ====================================================

  return (
    <Outlet />
  );
}