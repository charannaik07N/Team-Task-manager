import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Users, Trash2 } from "lucide-react";

export function ProjectCard({ project, onDelete }) {
  const membersCount = project.members?.length || 0;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_42px_-26px_rgba(15,23,42,0.35)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-500 to-sky-400" />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Project
          </p>
          <h3 className="mt-2 truncate text-xl font-semibold tracking-tight text-slate-900">
            {project.name}
          </h3>
        </div>
        <button
          onClick={() => onDelete(project._id)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 active:scale-95"
          aria-label={`Delete ${project.name}`}
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          <Users size={14} />
          {membersCount} member{membersCount === 1 ? "" : "s"}
        </span>
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          Active workspace
        </span>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
        {project.description || "No description provided."}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div className="text-xs text-slate-500">
          Use this project to keep tasks and members grouped in one place.
        </div>
        <Link
          to={`/projects/${project._id}`}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          View
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
