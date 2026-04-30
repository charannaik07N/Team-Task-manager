import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

export function TaskModal({ task, isOpen, onClose, onSave, projectMembers }) {
  const isEditMode = !!task;
  const getInitialFormData = (taskData) =>
    taskData
      ? {
          title: taskData.title || "",
          description: taskData.description || "",
          status: taskData.status || "Todo",
          priority: taskData.priority || "Medium",
          assignedTo: taskData.assignedTo?._id || taskData.assignedTo || "",
          dueDate: taskData.dueDate ? taskData.dueDate.split("T")[0] : "",
        }
      : {
          title: "",
          description: "",
          status: "Todo",
          priority: "Medium",
          assignedTo: "",
          dueDate: "",
        };

  const [formData, setFormData] = useState(getInitialFormData(task));

  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialFormData(task));
    }
  }, [task, isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      const original = getInitialFormData(task);
      const updateData = {};

      if (formData.status !== original.status)
        updateData.status = formData.status;
      if (formData.priority !== original.priority)
        updateData.priority = formData.priority;
      if (formData.assignedTo !== original.assignedTo)
        updateData.assignedTo = formData.assignedTo || null;
      if (formData.dueDate !== original.dueDate)
        updateData.dueDate = formData.dueDate || null;

      onSave(updateData);
      return;
    }

    onSave({
      ...formData,
      assignedTo: formData.assignedTo || null,
      dueDate: formData.dueDate || null,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {isEditMode ? "Edit Task" : "Create Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title - only required for new tasks */}
          {!isEditMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Task title"
              />
            </div>
          )}

          {/* Description - only for new tasks */}
          {!isEditMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Task description"
                rows="3"
              />
            </div>
          )}

          {/* Priority & Status - shown for both create and edit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Todo</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
            </div>
          </div>

          {/* Assign To - shown for both */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assign To
            </label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Unassigned</option>
              {projectMembers?.map((member) => (
                <option key={member.userId._id} value={member.userId._id}>
                  {member.userId.name}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date - shown for both */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate ? formData.dueDate.split("T")[0] : ""}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              {isEditMode ? "Update" : "Create"} Task
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
