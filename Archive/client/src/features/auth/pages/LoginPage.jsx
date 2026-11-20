import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context";

export default function Login() {
  const navigate = useNavigate();
  const { login, user, loading: authLoading } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!authLoading && user) {
      const nextPath =
        user.role === "SUPER_ADMIN" || user.role === "ADMIN"
          ? "/admin"
          : "/";
      navigate(nextPath, { replace: true });
    }
  }, [authLoading, user, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setSubmitting(true);

    try {
      const result = await login(form.email, form.password);
      const nextPath =
        result?.user?.role === "SUPER_ADMIN" || result?.user?.role === "ADMIN"
          ? "/admin"
          : "/";
      navigate(nextPath, { replace: true });
    } catch (error) {
      setMessage(
        error?.response?.data?.message ||
        "Login gagal. Periksa email dan password kamu."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-choco px-4 py-12 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur md:grid-cols-2">
          <div className="hidden flex-col justify-between bg-linear-to-br from-[#2a1408] via-[#1a0d05] to-choco p-10 md:flex">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/60">
                Impervious Generation
              </p>
              <h1 className="mt-4 max-w-md text-4xl font-semibold leading-tight">
                Selamat datang kembali.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
                Masuk untuk melanjutkan akses ke fitur komunitas, forum, dan
                halaman personal yang terhubung dengan akunmu.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/70">
                Akses yang aman, tampilan yang tenang, dan pengalaman yang
                tetap ringan di semua perangkat.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                Login
              </p>
              <h2 className="mt-2 text-3xl font-semibold">Masuk ke akun</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Gunakan email dan password yang sudah terdaftar.
              </p>
            </div>

            {message && (
              <div className="mb-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-white/70">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@gmail.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/25"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/25"
                  autoComplete="current-password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 w-full rounded-2xl bg-white px-4 py-3 font-medium text-choco transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Memproses..." : "Masuk"}
              </button>
            </form>

            <p className="mt-6 text-sm text-white/60">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="font-medium text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
              >
                Daftar di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}