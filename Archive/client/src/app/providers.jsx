import { AuthProvider } from "../context";

export default function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}