import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, CircleCheck } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const hasMinLength = formData.password.length >= 6;
  const hasLetter = /[A-Za-z]/.test(formData.password);
  const hasNumber = /\d/.test(formData.password);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-10">
      <div
        className={`mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_24px_70px_-28px_rgba(15,23,42,0.35)] lg:grid-cols-[1.08fr_1fr] ${mounted ? "animate-item" : ""}`}
        style={{ animationDelay: "40ms" }}
      >
        <aside className="relative hidden overflow-hidden bg-[linear-gradient(145deg,#f8fafc_0%,#e2ecff_52%,#dbeafe_100%)] px-8 py-10 lg:flex lg:flex-col">
          <div
            className="absolute -left-10 top-8 h-48 w-48 rounded-full bg-blue-300/35 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-12 right-2 h-56 w-56 rounded-full bg-cyan-300/35 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold tracking-[0.2em] text-white">
            TM
          </div>
          <h2 className="relative z-10 mt-7 text-3xl font-semibold leading-tight text-slate-900">
            Create account details and start organizing team execution.
          </h2>
          <p className="relative z-10 mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
            Bring projects, members, and delivery timelines together with one
            focused workspace.
          </p>

          <img
            src="/undraw_onboarding_dcq2.svg"
            alt="Create account illustration"
            className="relative z-10 mt-auto w-full max-w-md self-center"
          />
        </aside>

        <section className="p-6 sm:p-9 md:p-10">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Team Task Manager
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Create Account
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Set up your account details to begin planning with your team.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition-colors group-focus-within:text-blue-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border-2 border-slate-200 py-3 pl-12 pr-4 text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition-colors group-focus-within:text-blue-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border-2 border-slate-200 py-3 pl-12 pr-4 text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition-colors group-focus-within:text-blue-500">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border-2 border-slate-200 py-3 pl-12 pr-12 text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Create a secure password"
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
              <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                <span
                  className={`inline-flex items-center gap-1 ${hasMinLength ? "text-emerald-700" : ""}`}
                >
                  <CircleCheck size={14} /> 6+ characters
                </span>
                <span
                  className={`inline-flex items-center gap-1 ${hasLetter ? "text-emerald-700" : ""}`}
                >
                  <CircleCheck size={14} /> letter
                </span>
                <span
                  className={`inline-flex items-center gap-1 ${hasNumber ? "text-emerald-700" : ""}`}
                >
                  <CircleCheck size={14} /> number
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Confirm Password
              </label>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition-colors group-focus-within:text-blue-500">
                  <Lock size={18} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border-2 border-slate-200 py-3 pl-12 pr-12 text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Repeat your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-500 transition-all hover:text-slate-700 active:scale-95"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
              Sign in
            </Link>
          </p>

          <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-600 lg:hidden">
            Tip: Use your work email so teammates can find and collaborate with
            you faster.
          </div>
        </section>
      </div>
    </div>
  );
}
