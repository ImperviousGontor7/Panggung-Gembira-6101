import { Suspense, lazy } from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

// =========================
// LAYOUTS
// =========================

const MainLayout = lazy(() =>
  import("../layouts/MainLayout")
);

const AuthLayout = lazy(() =>
  import("../layouts/AuthLayout")
);

// =========================
// PUBLIC PAGES
// =========================

const HomePage = lazy(() =>
  import("../features/news/pages/HomePage")
);

const AboutPage = lazy(() =>
  import(
    "../features/profile/pages/AboutPage"
  )
);

const MemoriesPage = lazy(() =>
  import(
    "../features/profile/pages/MemoriesPage"
  )
);

// =========================
// AUTH PAGES
// =========================

const LoginPage = lazy(() =>
  import("../features/auth/pages/LoginPage")
);

const RegisterPage = lazy(() =>
  import("../features/auth/pages/RegisterPage")
);

// =========================
// LOADING FALLBACK
// =========================

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-neutral-500">
        Loading...
      </p>
    </div>
  );
}

// =========================
// ROUTER
// =========================

function AppRouter() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* =========================
            PUBLIC WEBSITE
        ========================== */}

        <Route element={<MainLayout />}>
          <Route
            index
            element={<HomePage />}
          />

          <Route
            path="about"
            element={<AboutPage />}
          />

          <Route
            path="memories"
            element={
              <MemoriesPage />
            }
          />

        </Route>

        {/* =========================
            AUTHENTICATION
        ========================== */}

        <Route element={<AuthLayout />}>
          <Route
            path="login"
            element={<LoginPage />}
          />

          <Route
            path="register"
            element={<RegisterPage />}
          />
        </Route>

        {/* =========================
            FALLBACK
        ========================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;