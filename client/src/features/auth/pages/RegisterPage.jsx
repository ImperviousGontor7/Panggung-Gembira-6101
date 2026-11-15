import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context";

export default function Register() {
  const navigate = useNavigate();
  const { register, user, loading: authLoading } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (form.password !== form.confirmPassword) {
      setMessage("Password dan konfirmasi password tidak sama.");
      return;
    }

    setSubmitting(true);

    try {
      await register(form.username, form.email, form.password);
      navigate("/", { replace: true });
    } catch (error) {
      setMessage(
        error?.response?.data?.message ||
        "Registrasi gagal. Coba periksa data yang kamu isi."
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
                Buat akun baru.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
                Daftar untuk mulai menggunakan forum, fitur komunitas, dan
                halaman yang terhubung dengan akunmu.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/70">
                Username dan email harus unik. Password akan disimpan dalam
                bentuk hash di server.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                Register
              </p>
              <h2 className="mt-2 text-3xl font-semibold">Daftar akun</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Isi data berikut untuk membuat akun baru.
              </p>
            </div>

            {message && (
              <div className="mb-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="admin"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/25"
                  autoComplete="username"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Email
                </label>
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
                  autoComplete="new-password"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/25"
                  autoComplete="new-password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 w-full rounded-2xl bg-white px-4 py-3 font-medium text-choco transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Mendaftarkan..." : "Daftar"}
              </button>
            </form>

            <p className="mt-6 text-sm text-white/60">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="font-medium text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}