import { createContext } from "react";

const AuthContext = createContext({
  user: null,
  loading: true,
  isAuthenticated: false,
  login: async () => { },
  register: async () => { },
  logout: async () => { },
  refreshAuth: async () => { },
  clearSession: () => { },
  setUser: () => { },
});

export default AuthContext;