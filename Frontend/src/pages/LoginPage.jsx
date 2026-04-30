import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getErrorMessage = (err) => {
    if (!err) return "";
    if (err.response) {
      const status = err.response.status;
      if (status === 401)
        return "Incorrect email or password. Try again or reset your password.";
      if (status === 400)
        return (
          err.response.data?.message ||
          "Invalid request. Check your input and try again."
        );
      return (
        err.response.data?.message ||
        "We couldn't sign you in. Please try again."
      );
    }
    return "Network error - please check your connection and try again.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-10">
      <div
        className={`mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_24px_70px_-28px_rgba(15,23,42,0.35)] lg:grid-cols-[1.12fr_1fr] ${mounted ? "animate-item" : ""}`}
        style={{ animationDelay: "40ms" }}
      >
        <aside className="relative hidden overflow-hidden bg-[linear-gradient(150deg,#0f172a_0%,#1d4ed8_52%,#0ea5e9_100%)] px-8 py-10 text-white lg:flex lg:flex-col">
          <div
            className="absolute -left-16 -top-20 h-64 w-64 rounded-full bg-cyan-300/15 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-20 right-6 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/18 text-sm font-semibold tracking-[0.2em]">
            TM
          </div>
          <h2 className="relative z-10 mt-7 text-3xl font-semibold leading-tight">
            Plan work faster with your whole team in one place.
          </h2>
          <p className="relative z-10 mt-4 max-w-sm text-sm leading-relaxed text-blue-50/90">
            Track priorities, keep projects aligned, and move tasks from idea to
            done without losing momentum.
          </p>

          <img
            src="/undraw_welcome_nk8k.svg"
            alt="Welcome illustration"
            className="relative z-10 mt-auto w-full max-w-md self-center drop-shadow-[0_16px_30px_rgba(2,6,23,0.45)]"
          />
        </aside>

        <section className="p-6 sm:p-9 md:p-10">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Team Task Manager
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Sign in to continue managing projects and deadlines.
            </p>
          </div>

          {error && (
            <div role="alert" aria-live="assertive" className="mb-6">
              <div className="rounded-lg border-l-4 border-red-500 bg-red-50 px-4 py-3 text-red-800">
                <strong className="block font-semibold text-red-900">
                  Sign in failed
                </strong>
                <div className="mt-1 text-sm">{error}</div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition-colors group-focus-within:text-blue-500">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-describedby="email-help"
                  className="w-full rounded-xl border-2 border-slate-200 py-3 pl-12 pr-4 text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="you@company.com"
                />
              </div>
              <p id="email-help" className="mt-2 text-xs text-slate-500">
                Use the email you registered with.
              </p>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition-colors group-focus-within:text-blue-500">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-describedby="password-help"
                  className="w-full rounded-xl border-2 border-slate-200 py-3 pl-12 pr-12 text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-500 transition-all hover:text-slate-700 active:scale-95"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p id="password-help" className="mt-2 text-xs text-slate-500">
                Enter the password for your account.
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="group inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer accent-blue-600"
                />
                <span className="ml-2 text-sm text-slate-600 transition-colors group-hover:text-slate-900">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot"
                className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading && (
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              <span>{loading ? "Signing in..." : "Sign in"}</span>
            </button>
          </form>

          <div className="mt-8 border-t border-slate-100 pt-7 text-center">
            <p className="text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
              >
                Create account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
