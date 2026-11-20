import authApi from "../../../api/auth.api.js";

export async function login(email, password) {
  return authApi.login({ email, password });
}

export async function register(username, email, password, fullName = "") {
  return authApi.register({
    username,
    email,
    password,
    fullName: fullName || undefined,
  });
}

export async function refresh() {
  return authApi.refresh();
}

export async function me() {
  return authApi.me();
}

export async function logout() {
  return authApi.logout();
}

const authService = {
  login,
  register,
  refresh,
  me,
  logout,
};

export default authService;