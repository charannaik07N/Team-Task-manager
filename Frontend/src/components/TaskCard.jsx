import React from "react";
import { Trash2, Edit2 } from "lucide-react";

export function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const priority = task.priority || "Medium";
  const status = task.status || "Todo";
  const priorityColors = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
  };

  const statusColors = {
    Todo: "bg-gray-100 text-gray-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Done: "bg-green-100 text-green-800",
  };

  return (
    <div
      className={`card-refined mb-4 border-l-4 hover:-translate-y-1 hover:shadow-lg transition-transform ${
        priority === "High"
          ? "border-red-400"
          : priority === "Medium"
            ? "border-amber-400"
            : "border-emerald-300"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-slate-900">{task.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-sky-500 hover:text-sky-700 btn-pressable active:scale-95"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-rose-500 hover:text-rose-700 btn-pressable active:scale-95"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <p className="text-slate-600 text-sm mb-3">{task.description}</p>

      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded text-xs font-semibold ${priorityColors[priority]}`}
          >
            {priority}
          </span>
          <select
            value={status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            className={`px-3 py-1 rounded text-xs font-semibold ${statusColors[status]} cursor-pointer`}
          >
            <option>Todo</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
        <div className="text-xs text-slate-500">
          {task.dueDate && (
            <div>Due: {new Date(task.dueDate).toLocaleDateString()}</div>
          )}
          {task.assignedTo && (
            <div>Assigned: {task.assignedTo.name || "Unassigned"}</div>
          )}
        </div>
      </div>
    </div>
  );
}
