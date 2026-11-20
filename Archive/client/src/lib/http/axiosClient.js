import axios from "axios";

// ======================================================
// API CONFIGURATION
// ======================================================

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5001/api";

// ======================================================
// ACCESS TOKEN
// ======================================================

const ACCESS_TOKEN_KEY = "token";

// ======================================================
// AXIOS CLIENT
// ======================================================

/**
 * Client utama untuk seluruh REST API.
 *
 * Access token:
 *   Authorization: Bearer <token>
 *
 * Refresh token:
 *   HttpOnly cookie
 *
 * withCredentials:
 *   diperlukan agar browser mengirim cookie
 *   ke backend.
 */
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,

  headers: {
    Accept: "application/json",
  },

  timeout: 30_000,
});

// ======================================================
// REFRESH CLIENT
// ======================================================

/**
 * Client khusus refresh token.
 *
 * Sengaja dipisahkan dari axiosClient agar request
 * /auth/refresh tidak masuk ke interceptor refresh utama.
 */
const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,

  headers: {
    Accept: "application/json",
  },

  timeout: 30_000,
});

// ======================================================
// TOKEN STORAGE
// ======================================================

function getAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }

  const token =
    window.localStorage.getItem(
      ACCESS_TOKEN_KEY,
    );

  if (typeof token !== "string") {
    return null;
  }

  const normalized = token.trim();

  return normalized || null;
}

function setAccessToken(token) {
  if (
    typeof window === "undefined" ||
    typeof token !== "string"
  ) {
    return;
  }

  const normalized = token.trim();

  if (!normalized) {
    return;
  }

  window.localStorage.setItem(
    ACCESS_TOKEN_KEY,
    normalized,
  );
}

function clearAccessToken() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(
    ACCESS_TOKEN_KEY,
  );
}

// ======================================================
// RESPONSE HELPERS
// ======================================================

function extractResponseData(response) {
  const payload = response?.data;

  if (
    payload === null ||
    payload === undefined
  ) {
    return null;
  }

  return payload?.data ?? payload;
}

function extractAccessToken(response) {
  const data =
    extractResponseData(response);

  if (
    typeof data?.accessToken === "string" &&
    data.accessToken.trim()
  ) {
    return data.accessToken.trim();
  }

  if (
    typeof data?.token === "string" &&
    data.token.trim()
  ) {
    return data.token.trim();
  }

  return null;
}

// ======================================================
// URL HELPERS
// ======================================================

function normalizeUrl(url = "") {
  return String(url)
    .split("?")[0]
    .replace(/\/+$/, "");
}

function isAuthEndpoint(url = "") {
  const normalizedUrl =
    normalizeUrl(url);

  return (
    normalizedUrl.endsWith("/auth/login") ||
    normalizedUrl.endsWith("/auth/register") ||
    normalizedUrl.endsWith("/auth/refresh") ||
    normalizedUrl.endsWith("/auth/logout")
  );
}

// ======================================================
// REQUEST HELPERS
// ======================================================

function isFormDataRequest(config) {
  if (typeof FormData === "undefined") {
    return false;
  }

  return (
    config?.data instanceof FormData
  );
}

function ensureHeaders(config) {
  if (!config.headers) {
    config.headers = {};
  }

  return config.headers;
}

function setAuthorizationHeader(
  config,
  token,
) {
  if (!token) {
    return config;
  }

  const headers =
    ensureHeaders(config);

  headers.Authorization =
    `Bearer ${token}`;

  return config;
}

function prepareRequestHeaders(config) {
  const headers =
    ensureHeaders(config);

  /**
   * Jangan memaksa Content-Type untuk FormData.
   *
   * Browser/Axios akan menentukan:
   *
   * multipart/form-data;
   * boundary=...
   *
   * secara otomatis.
   */
  if (isFormDataRequest(config)) {
    delete headers["Content-Type"];
    delete headers["content-type"];
  }

  return config;
}

// ======================================================
// REQUEST INTERCEPTOR
// ======================================================

axiosClient.interceptors.request.use(
  (config) => {
    const token =
      getAccessToken();

    if (token) {
      setAuthorizationHeader(
        config,
        token,
      );
    }

    return prepareRequestHeaders(
      config,
    );
  },

  (error) =>
    Promise.reject(error),
);

// ======================================================
// REFRESH STATE
// ======================================================

let isRefreshing = false;

let refreshQueue = [];

// ======================================================
// REFRESH QUEUE
// ======================================================

function processRefreshQueue(
  error,
  token = null,
) {
  const queue =
    refreshQueue;

  refreshQueue = [];

  queue.forEach(
    ({
      resolve,
      reject,
      config,
    }) => {
      if (
        error ||
        !token
      ) {
        reject(
          error ||
          new Error(
            "Refresh access token gagal.",
          ),
        );

        return;
      }

      setAuthorizationHeader(
        config,
        token,
      );

      resolve(
        axiosClient(config),
      );
    },
  );
}

// ======================================================
// QUEUE REQUEST
// ======================================================

function enqueueRequest(config) {
  return new Promise(
    (resolve, reject) => {
      refreshQueue.push({
        resolve,
        reject,
        config,
      });
    },
  );
}

// ======================================================
// REFRESH ACCESS TOKEN
// ======================================================

async function requestRefreshToken() {
  const response =
    await refreshClient.post(
      "/auth/refresh",
    );

  const newAccessToken =
    extractAccessToken(
      response,
    );

  if (!newAccessToken) {
    throw new Error(
      "Access token baru tidak ditemukan dari server.",
    );
  }

  setAccessToken(
    newAccessToken,
  );

  return newAccessToken;
}

// ======================================================
// RESPONSE INTERCEPTOR
// ======================================================

axiosClient.interceptors.response.use(
  (response) =>
    response,

  async (error) => {
    const status =
      error?.response?.status;

    const originalRequest =
      error?.config;

    // --------------------------------------------------
    // Tidak ada response/config.
    // --------------------------------------------------

    if (
      !status ||
      !originalRequest
    ) {
      return Promise.reject(
        error,
      );
    }

    // --------------------------------------------------
    // Hanya HTTP 401 yang memicu refresh.
    // --------------------------------------------------

    if (status !== 401) {
      return Promise.reject(
        error,
      );
    }

    // --------------------------------------------------
    // Request auth tidak melakukan automatic refresh.
    // --------------------------------------------------

    if (
      isAuthEndpoint(
        originalRequest.url,
      )
    ) {
      return Promise.reject(
        error,
      );
    }

    // --------------------------------------------------
    // Request yang sudah retry tidak boleh retry lagi.
    // --------------------------------------------------

    if (
      originalRequest._retry
    ) {
      clearAccessToken();

      return Promise.reject(
        error,
      );
    }

    originalRequest._retry =
      true;

    // --------------------------------------------------
    // Jika refresh sedang berjalan,
    // masukkan request ke queue.
    // --------------------------------------------------

    if (isRefreshing) {
      return enqueueRequest(
        originalRequest,
      );
    }

    // --------------------------------------------------
    // Mulai satu refresh saja.
    // --------------------------------------------------

    isRefreshing = true;

    try {
      const newAccessToken =
        await requestRefreshToken();

      // ------------------------------------------------
      // Semua request yang menunggu mendapatkan token.
      // ------------------------------------------------

      processRefreshQueue(
        null,
        newAccessToken,
      );

      // ------------------------------------------------
      // Update request pertama.
      // ------------------------------------------------

      setAuthorizationHeader(
        originalRequest,
        newAccessToken,
      );

      return axiosClient(
        originalRequest,
      );
    } catch (
      refreshError
    ) {
      clearAccessToken();

      processRefreshQueue(
        refreshError,
      );

      return Promise.reject(
        refreshError,
      );
    } finally {
      isRefreshing = false;
    }
  },
);

// ======================================================
// PUBLIC API
// ======================================================

export {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
};

export default axiosClient;