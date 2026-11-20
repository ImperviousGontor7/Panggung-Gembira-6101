import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import authApi from "../api/auth.api.js";

import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "../lib/http/axiosClient.js";

import AuthContext from "./auth-context.js";

// ======================================================
// RESPONSE HELPERS
// ======================================================

/**
 * Mengambil payload utama dari response backend.
 *
 * Mendukung:
 *
 * {
 *   data: {
 *     ...
 *   }
 * }
 *
 * maupun:
 *
 * {
 *   ...
 * }
 */
function extractData(response) {
  return (
    response?.data?.data ??
    response?.data ??
    response ??
    null
  );
}

/**
 * Mengambil session authentication.
 *
 * Contract utama:
 *
 * {
 *   user,
 *   accessToken
 * }
 *
 * Backward compatibility:
 *
 * {
 *   user,
 *   token
 * }
 */
function extractSession(response) {
  const data = extractData(response);

  return {
    user: data?.user ?? null,
    token:
      data?.accessToken ??
      data?.token ??
      null,
  };
}

/**
 * Mengambil user dari response /auth/me.
 */
function extractUser(response) {
  const data = extractData(response);

  return data?.user ?? data ?? null;
}

/**
 * Menormalisasi access token.
 */
function normalizeToken(token) {
  if (typeof token !== "string") {
    return null;
  }

  const normalized = token.trim();

  return normalized || null;
}

/**
 * Memastikan session hasil login/register valid.
 */
function isValidSession(session) {
  return Boolean(
    session?.user &&
    normalizeToken(session.token)
  );
}

// ======================================================
// AUTH PROVIDER
// ======================================================

export default function AuthProvider({
  children,
}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Mencegah state update setelah component unmount.
   */
  const mountedRef = useRef(false);

  /**
   * Mencegah initialization auth dijalankan dua kali
   * secara bersamaan.
   */
  const initializationRef = useRef(null);

  // ====================================================
  // SAFE STATE HELPERS
  // ====================================================

  const safeSetUser = useCallback(
    (nextUser) => {
      if (!mountedRef.current) {
        return;
      }

      setUser(nextUser);
    },
    []
  );

  const safeSetLoading = useCallback(
    (nextLoading) => {
      if (!mountedRef.current) {
        return;
      }

      setLoading(nextLoading);
    },
    []
  );

  // ====================================================
  // CLEAR SESSION
  // ====================================================

  /**
   * Membersihkan authentication state di client.
   *
   * Catatan:
   * clearSession() tidak memanggil backend.
   *
   * Gunakan logout() untuk logout normal karena logout()
   * juga meminta backend mencabut refresh session.
   */
  const clearSession = useCallback(() => {
    clearAccessToken();
    safeSetUser(null);
  }, [safeSetUser]);

  // ====================================================
  // APPLY SESSION
  // ====================================================

  /**
   * Menyimpan access token dan user hasil authentication.
   */
  const applySession = useCallback(
    (session) => {
      if (!isValidSession(session)) {
        throw new Error(
          "Session tidak valid: user atau access token tidak ditemukan."
        );
      }

      const token = normalizeToken(
        session.token
      );

      if (!token) {
        throw new Error(
          "Access token tidak valid."
        );
      }

      setAccessToken(token);
      safeSetUser(session.user);

      return session.user;
    },
    [safeSetUser]
  );

  // ====================================================
  // LOAD CURRENT USER
  // ====================================================

  /**
   * Mengambil user yang sedang login melalui /auth/me.
   *
   * Jika access token expired, axiosClient akan menangani
   * refresh secara otomatis melalui response interceptor.
   */
  const loadCurrentUser = useCallback(
    async () => {
      const response =
        await authApi.me();

      const currentUser =
        extractUser(response);

      if (!currentUser) {
        throw new Error(
          "User session tidak ditemukan."
        );
      }

      safeSetUser(currentUser);

      return currentUser;
    },
    [safeSetUser]
  );

  // ====================================================
  // LOGIN
  // ====================================================

  const login = useCallback(
    async (email, password) => {
      const response =
        await authApi.login({
          email,
          password,
        });

      const session =
        extractSession(response);

      const currentUser =
        applySession(session);

      return {
        success: true,
        user: currentUser,
      };
    },
    [applySession]
  );

  // ====================================================
  // REGISTER
  // ====================================================

  const register = useCallback(
    async (
      username,
      email,
      password,
      fullName = ""
    ) => {
      const normalizedFullName =
        typeof fullName === "string"
          ? fullName.trim()
          : "";

      const response =
        await authApi.register({
          username,
          email,
          password,
          fullName:
            normalizedFullName ||
            undefined,
        });

      const session =
        extractSession(response);

      const currentUser =
        applySession(session);

      return {
        success: true,
        user: currentUser,
      };
    },
    [applySession]
  );

  // ====================================================
  // LOGOUT
  // ====================================================

  /**
   * Logout normal.
   *
   * Backend tetap dipanggil untuk mencabut refresh session.
   *
   * Client selalu dibersihkan melalui finally meskipun
   * request logout gagal.
   */
  const logout = useCallback(
    async () => {
      try {
        await authApi.logout();
      } finally {
        clearSession();
      }
    },
    [clearSession]
  );

  // ====================================================
  // EXPLICIT REFRESH
  // ====================================================

  /**
   * Melakukan explicit refresh authentication.
   *
   * Fungsi ini terutama digunakan ketika aplikasi belum
   * memiliki access token tetapi kemungkinan masih memiliki
   * refresh token HttpOnly cookie.
   *
   * silent:
   * - true  → failure dianggap guest state, tanpa error noise
   * - false → failure tetap diperlakukan sebagai error normal
   */
  const refreshAuth = useCallback(
    async ({ silent = false } = {}) => {
      try {
        const response =
          await authApi.refresh();

        const session =
          extractSession(response);

        const token =
          normalizeToken(
            session.token
          );

        if (!token) {
          clearSession();
          return null;
        }

        setAccessToken(token);

        if (session.user) {
          safeSetUser(session.user);
          return session.user;
        }

        return await loadCurrentUser();
      } catch (error) {
        clearSession();

        if (silent) {
          return null;
        }

        throw error;
      }
    },
    [
      clearSession,
      loadCurrentUser,
      safeSetUser,
    ]
  );

  // ====================================================
  // INITIAL AUTH CHECK
  // ====================================================

  /**
   * Memeriksa session ketika aplikasi pertama kali
   * dijalankan.
   *
   * Flow:
   *
   * 1. Ada access token
   *      ↓
   *    /auth/me
   *      ↓
   *    berhasil → user
   *
   * 2. Tidak ada access token
   *      ↓
   *    /auth/refresh
   *      ↓
   *    berhasil → token baru → /auth/me
   *
   * 3. Semua gagal
   *      ↓
   *    anonymous
   *
   * Penting:
   *
   * Jika access token tersedia dan /me gagal, jangan
   * langsung memanggil refreshAuth() kedua kalinya.
   *
   * axiosClient sudah mempunyai response interceptor
   * yang menangani refresh otomatis ketika menerima 401.
   */
  const checkAuth = useCallback(
    async () => {
      /**
       * Hindari dua initialization berjalan bersamaan.
       */
      if (initializationRef.current) {
        return initializationRef.current;
      }

      const initialization =
        (async () => {
          safeSetLoading(true);

          try {
            const token =
              getAccessToken();

            // ------------------------------------------
            // ACCESS TOKEN TERSEDIA
            // ------------------------------------------

            if (token) {
              try {
                await loadCurrentUser();
                return;
              } catch {
                /**
                 * /me gagal.
                 *
                 * axiosClient sudah menangani kemungkinan
                 * 401 + refresh secara internal.
                 *
                 * Jika setelah proses tersebut request tetap
                 * gagal, anggap session tidak valid.
                 */
                clearSession();
                return;
              }
            }

            // ------------------------------------------
            // TIDAK ADA ACCESS TOKEN
            // ------------------------------------------

            const refreshedUser =
              await refreshAuth({
                silent: true,
              });

            if (!refreshedUser) {
              clearSession();
            }
          } catch {
            clearSession();
          } finally {
            safeSetLoading(false);
          }
        })();

      initializationRef.current =
        initialization;

      try {
        await initialization;
      } finally {
        /**
         * Hanya reset reference jika promise yang sedang
         * tersimpan memang promise yang baru selesai.
         */
        if (
          initializationRef.current ===
          initialization
        ) {
          initializationRef.current = null;
        }
      }
    },
    [
      clearSession,
      loadCurrentUser,
      refreshAuth,
      safeSetLoading,
    ]
  );

  // ====================================================
  // INITIALIZATION
  // ====================================================

  useEffect(() => {
    mountedRef.current = true;

    void checkAuth();

    return () => {
      mountedRef.current = false;
    };
  }, [checkAuth]);

  // ====================================================
  // CONTEXT VALUE
  // ====================================================

  const value = useMemo(
    () => ({
      user,
      loading,

      isAuthenticated:
        Boolean(user),

      login,
      register,
      logout,

      refreshAuth,
      checkAuth,

      clearSession,

      setUser: safeSetUser,
    }),
    [
      user,
      loading,
      login,
      register,
      logout,
      refreshAuth,
      checkAuth,
      clearSession,
      safeSetUser,
    ]
  );

  // ====================================================
  // PROVIDER
  // ====================================================

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}