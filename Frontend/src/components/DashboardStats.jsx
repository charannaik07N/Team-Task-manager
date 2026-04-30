import React from "react";
import { CheckCircle, AlertCircle, Zap } from "lucide-react";

export function DashboardStats({
  stats,
  loading,
  activeFilter,
  onFilterChange,
}) {
  if (loading) return <div className="text-center py-8">Loading...</div>;

  const statCards = [
    {
      id: "total",
      title: "Total Tasks",
      value: stats?.totalTasks || 0,
      icon: Zap,
      accent: "from-blue-500 to-sky-400",
      hoverTint: "hover:bg-blue-50/50",
    },
    {
      id: "completed",
      title: "Completed",
      value: stats?.completedTasks || 0,
      icon: CheckCircle,
      accent: "from-emerald-400 to-green-400",
      hoverTint: "hover:bg-emerald-50/50",
    },
    {
      id: "pending",
      title: "Pending",
      value: stats?.pendingTasks || 0,
      icon: AlertCircle,
      accent: "from-amber-300 to-amber-400",
      hoverTint: "hover:bg-amber-50/60",
    },
    {
      id: "overdue",
      title: "Overdue",
      value: stats?.overdueTasks || 0,
      icon: AlertCircle,
      accent: "from-rose-400 to-red-400",
      hoverTint: "hover:bg-rose-50/60",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 mb-8">
      {statCards.map((stat, idx) => {
        const Icon = stat.icon;
        const isActive = activeFilter === stat.id;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => onFilterChange?.(stat.id)}
            className={`group relative overflow-hidden rounded-2xl border bg-white p-5 text-left shadow-[0_10px_30px_-20px_rgba(15,23,42,0.35)] transition-[transform,box-shadow,background-color,border-color] duration-200 ease-out hover:scale-[1.03] hover:shadow-[0_18px_40px_-26px_rgba(15,23,42,0.35)] ${stat.hoverTint} ${isActive ? "border-blue-200 ring-2 ring-blue-500/25" : "border-slate-200/80"}`}
            aria-pressed={isActive}
            aria-label={`Show ${stat.title.toLowerCase()} tasks`}
          >
            <span
              className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${stat.accent}`}
              aria-hidden="true"
            />

            <div className="flex items-center gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${stat.accent} text-white shadow-md`}
              >
                <Icon size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>
                <p className="mt-1 text-[2.25rem] font-semibold leading-none tracking-tight text-slate-900">
                  {stat.value}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
