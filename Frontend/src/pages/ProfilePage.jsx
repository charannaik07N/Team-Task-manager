import React from "react";
import { useAuth } from "../hooks/useAuth";
import { CalendarDays, IdCard, Mail, UserCircle2 } from "lucide-react";

export function ProfilePage() {
  const { user } = useAuth();

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("")
    : "U";

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "Recently";

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
          <div className="flex flex-col items-start gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-900 text-2xl font-bold text-white shadow-sm">
              {userInitials}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Account Profile
              </p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                {user?.name || "Your profile"}
              </h1>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                Review your account details and identity information used across
                the workspace.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="inline-flex rounded-full bg-white p-2 text-slate-700 shadow-sm">
                <UserCircle2 size={18} />
              </div>
              <p className="mt-4 text-sm text-slate-500">Name</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">
                {user?.name || "Not available"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="inline-flex rounded-full bg-white p-2 text-slate-700 shadow-sm">
                <Mail size={18} />
              </div>
              <p className="mt-4 text-sm text-slate-500">Email</p>
              <p className="mt-1 wrap-break-word text-xl font-semibold text-slate-900">
                {user?.email || "Not available"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="inline-flex rounded-full bg-white p-2 text-slate-700 shadow-sm">
                <IdCard size={18} />
              </div>
              <p className="mt-4 text-sm text-slate-500">User ID</p>
              <p className="mt-1 break-all text-sm font-semibold text-slate-900">
                {user?.id || user?._id || "Not available"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="inline-flex rounded-full bg-white p-2 text-slate-700 shadow-sm">
                <CalendarDays size={18} />
              </div>
              <p className="mt-4 text-sm text-slate-500">Member since</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">
                {memberSince}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Workspace identity
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Role</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                Member
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Status</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                Active
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Access</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                Protected
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
