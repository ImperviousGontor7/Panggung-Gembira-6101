import {
  Suspense,
  lazy,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import PageLoader from "../components/PageLoader";

// =========================
// LAYOUTS
// =========================

const MainLayout = lazy(() => import("../layouts/MainLayout"));
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));

// =========================
// PUBLIC PAGES
// =========================

const HomePage = lazy(() =>
  import("../features/news/pages/HomePage"),
);

const AboutPage = lazy(() =>
  import("../features/profile/pages/AboutPage"),
);

const MemoriesPage = lazy(() =>
  import("../features/profile/pages/MemoriesPage"),
);

const PerformanceDetailPage = lazy(() =>
  import("../features/performances/pages/PerformanceDetailPage"),
);

// =========================
// AUTH PAGES
// =========================

const LoginPage = lazy(() =>
  import("../features/auth/pages/LoginPage"),
);

const RegisterPage = lazy(() =>
  import("../features/auth/pages/RegisterPage"),
);

// =========================
// ROUTER
// =========================

function AppRouter() {
  const location = useLocation();
  const previousLocationKey = useRef(location.key);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Show the overlay before the browser paints the newly selected route.
  // This covers Link, NavLink, useNavigate, and browser Back/Forward navigation.
  useLayoutEffect(() => {
    if (previousLocationKey.current === location.key) {
      return undefined;
    }

    previousLocationKey.current = location.key;
    setIsTransitioning(true);

    const timeoutId = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [location.key]);

  return (
    <>
      <PageLoader visible={isTransitioning} />

      <Suspense
        fallback={isTransitioning ? null : <PageLoader visible />}
      >
        <Routes location={location}>
          {/* =========================
              PUBLIC WEBSITE
          ========================== */}
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="memories" element={<MemoriesPage />} />
            <Route path="memories/:collection" element={<MemoriesPage />} />
            <Route path="performances/:slug" element={<PerformanceDetailPage />} />
          </Route>

          {/* =========================
              AUTHENTICATION
          ========================== */}
          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          {/* =========================
              FALLBACK
          ========================== */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRouter;
