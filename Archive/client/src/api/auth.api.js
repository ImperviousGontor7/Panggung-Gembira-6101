import axiosClient from "../lib/http/axiosClient.js";

// ======================================================
// RESPONSE HELPER
// ======================================================

function unwrapResponse(response) {
  return (
    response?.data ??
    response ??
    null
  );
}

// ======================================================
// REGISTER
// ======================================================

async function register(payload) {
  const response =
    await axiosClient.post(
      "/auth/register",
      payload
    );

  return unwrapResponse(
    response
  );
}

// ======================================================
// LOGIN
// ======================================================

async function login(payload) {
  const response =
    await axiosClient.post(
      "/auth/login",
      payload
    );

  return unwrapResponse(
    response
  );
}

// ======================================================
// REFRESH
// ======================================================

async function refresh() {
  const response =
    await axiosClient.post(
      "/auth/refresh"
    );

  return unwrapResponse(
    response
  );
}

// ======================================================
// CURRENT USER
// ======================================================

async function me() {
  const response =
    await axiosClient.get(
      "/auth/me"
    );

  return unwrapResponse(
    response
  );
}

// ======================================================
// LOGOUT
// ======================================================

async function logout() {
  const response =
    await axiosClient.post(
      "/auth/logout"
    );

  return unwrapResponse(
    response
  );
}

// ======================================================
// API
// ======================================================

const authApi = {
  register,
  login,
  refresh,
  me,
  logout,
};

// ======================================================
// EXPORT
// ======================================================

export {
  register,
  login,
  refresh,
  me,
  logout,
};

export default authApi;