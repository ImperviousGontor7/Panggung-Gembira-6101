import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context";

const navItemClass = ({
  isActive,
}) =>
  [
    "block rounded-2xl px-4 py-3 text-sm font-semibold transition",
    isActive
      ? "bg-white text-black"
      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
  ].join(" ");

export default function AdminLayout() {
  const {
    user,
    logout,
  } = useAuth();

  const navigate =
    useNavigate();

  async function handleLogout() {
    try {
      await logout();
    } finally {
      navigate(
        "/",
        {
          replace: true,
        },
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#120a05] text-white">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Admin Panel
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              {user?.fullName ||
                user?.username ||
                "Admin"}
            </h2>

            <p className="text-sm text-white/60">
              {user?.role ||
                "ADMIN"}
            </p>
          </div>

          <nav className="mt-5 space-y-2">
            <NavLink
              to="/admin"
              end
              className={
                navItemClass
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/users"
              className={
                navItemClass
              }
            >
              Users
            </NavLink>

            <NavLink
              to="/admin/news"
              className={
                navItemClass
              }
            >
              News
            </NavLink>

            <NavLink
              to="/admin/media"
              className={
                navItemClass
              }
            >
              Media
            </NavLink>

            <NavLink
              to="/admin/upload"
              className={
                navItemClass
              }
            >
              Upload
            </NavLink>
          </nav>

          <button
            type="button"
            onClick={
              handleLogout
            }
            className="mt-6 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/15"
          >
            Logout
          </button>
        </aside>

        <main className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}