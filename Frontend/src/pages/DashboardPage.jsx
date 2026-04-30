import React, { useEffect, useState } from "react";
import { CalendarClock, CircleAlert, CheckCircle2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { dashboardService } from "../services";
import { DashboardStats } from "../components/DashboardStats";

export function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("total");

  const filterMeta = {
    total: {
      title: "All Tasks",
      description: "A quick overview of everything created in your workspace.",
      illustration: "/undraw_task-list_qe3p.svg",
      tone: "bg-blue-50 border-blue-100",
      badge: "All work",
      helper: "Shows every task you created",
    },
    completed: {
      title: "Completed Tasks",
      description: "Items that are already finished and ready to review.",
      illustration: "/undraw_completed-tasks_1j9z.svg",
      tone: "bg-emerald-50 border-emerald-100",
      badge: "Done",
      helper: "Only finished work appears here",
    },
    pending: {
      title: "Pending Tasks",
      description: "Open tasks that still need attention before they are done.",
      illustration: "/undraw_pending-approval_6cdu.svg",
      tone: "bg-amber-50 border-amber-100",
      badge: "In progress",
      helper: "Open tasks that are still moving",
    },
    overdue: {
      title: "Overdue Tasks",
      description:
        "Tasks that have passed their due date and need a follow-up.",
      illustration: "/undraw_reminders_o8j5.svg",
      tone: "bg-rose-50 border-rose-100",
      badge: "Needs action",
      helper: "Work that needs attention now",
    },
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsResponse, tasksResponse] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getTasks(),
        ]);

        setStats(statsResponse.data.stats);
        setTasks(tasksResponse.data.tasks || []);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const isTaskOverdue = (task) => {
    if (!task?.dueDate || task.status === "Done") return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(task.dueDate) < today;
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "completed") return task.status === "Done";
    if (activeFilter === "pending") {
      return task.status !== "Done" && !isTaskOverdue(task);
    }
    if (activeFilter === "overdue") return isTaskOverdue(task);
    return true;
  });

  const filterTitle = {
    total: "All Tasks",
    completed: "Completed Tasks",
    pending: "Pending Tasks",
    overdue: "Overdue Tasks",
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "No due date";
    return new Date(dateValue).toLocaleDateString();
  };

  const getTaskStateBadge = (task) => {
    if (isTaskOverdue(task)) {
      return "bg-rose-100 text-rose-700";
    }
    if (task.status === "Done") {
      return "bg-emerald-100 text-emerald-700";
    }
    return "bg-amber-100 text-amber-700";
  };

  const getTaskStateLabel = (task) => {
    if (isTaskOverdue(task)) return "Overdue";
    if (task.status === "Done") return "Done";
    return task.status || "Pending";
  };

  const getPriorityTone = (priority) => {
    if (priority === "High") return "bg-rose-100 text-rose-700";
    if (priority === "Medium") return "bg-amber-100 text-amber-700";
    return "bg-slate-100 text-slate-600";
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-slate-800">Dashboard</h1>
        <DashboardStats
          stats={stats}
          loading={loading}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 mb-4">
            Quick Insights
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Pending tasks</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {stats?.pendingTasks || 0}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Need attention before they pile up.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Overdue tasks</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {stats?.overdueTasks || 0}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                These need a quick follow-up.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Completion rate</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {stats?.totalTasks || 0
                  ? Math.round(
                      ((stats?.completedTasks || 0) /
                        (stats?.totalTasks || 1)) *
                        100,
                    )
                  : 0}
                %
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Based on your current workload.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Total tasks</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {stats?.totalTasks || 0}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                All tasks created in your workspace.
              </p>
            </div>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <div
            className={`overflow-hidden rounded-3xl border p-6 shadow-sm ${filterMeta[activeFilter].tone}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="max-w-md">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Selected View
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-800 sm:text-[1.9rem]">
                  {filterMeta[activeFilter].title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {filterMeta[activeFilter].description}
                </p>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  {filterMeta[activeFilter].helper}
                </p>
              </div>

              <span className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-sm">
                {filterMeta[activeFilter].badge}
              </span>
            </div>

            <div className="mt-6 grid gap-4 rounded-2xl border border-white/70 bg-white/70 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="space-y-3">
                <div className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                  {filterTitle[activeFilter]}
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Tasks
                    </p>
                    <p className="mt-1 text-lg font-semibold text-slate-800">
                      {filteredTasks.length}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Status
                    </p>
                    <p className="mt-1 text-lg font-semibold text-slate-800">
                      {filterMeta[activeFilter].badge}
                    </p>
                  </div>
                </div>
              </div>

              <img
                src={filterMeta[activeFilter].illustration}
                alt={filterMeta[activeFilter].title}
                className="h-44 w-full max-w-xs justify-self-center object-contain sm:h-52"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                  {filterTitle[activeFilter]}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Click any stat card above to switch this list.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                {filteredTasks.length} task
                {filteredTasks.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="mt-5">
              {loading ? (
                <div className="py-10 text-center text-slate-500">
                  Loading tasks...
                </div>
              ) : filteredTasks.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-slate-500">
                  <img
                    src={filterMeta[activeFilter].illustration}
                    alt="Empty task illustration"
                    className="mx-auto h-40 w-full max-w-xs object-contain"
                  />
                  <p className="mt-4 text-base font-medium text-slate-700">
                    No tasks found for this view.
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Start by creating a task in one of your projects.
                  </p>
                  <Link
                    to="/projects"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                  >
                    <Plus size={16} />
                    Create Task
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <article
                      key={task._id}
                      className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-semibold tracking-tight text-slate-800">
                            {task.title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-slate-600">
                            {task.description || "No description provided."}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getTaskStateBadge(task)}`}
                        >
                          {getTaskStateLabel(task)}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 font-semibold ${getPriorityTone(task.priority)}`}
                        >
                          Priority: {task.priority}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 font-medium text-slate-500 border border-slate-200">
                          <CalendarClock size={14} /> {formatDate(task.dueDate)}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 font-medium text-slate-500 border border-slate-200">
                          <CircleAlert size={14} /> {getTaskStateLabel(task)}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 font-medium text-slate-500 border border-slate-200">
                          <CheckCircle2 size={14} />
                          {task.projectId?.name || "No project"}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
