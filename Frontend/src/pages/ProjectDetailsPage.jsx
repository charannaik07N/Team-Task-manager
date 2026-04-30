import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, Users } from "lucide-react";
import { projectService, taskService } from "../services";
import { TaskCard } from "../components/TaskCard";
import { TaskModal } from "../components/TaskModal";

export function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [memberData, setMemberData] = useState({ userId: "", role: "Member" });

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const projectResponse = await projectService.getProject(id);
      setProject(projectResponse.data.project);

      const tasksResponse = await taskService.getTasks(id);
      setTasks(tasksResponse.data.tasks || []);
    } catch (err) {
      setError("Failed to fetch project details");
      setProject(null);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (formData) => {
    try {
      await taskService.createTask(
        formData.title,
        formData.description,
        id,
        formData.assignedTo || null,
        formData.status,
        formData.priority,
        formData.dueDate,
      );
      setShowTaskModal(false);
      setSelectedTask(null);
      fetchProjectDetails();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await taskService.updateTask(selectedTask._id, taskData);
      setShowTaskModal(false);
      setSelectedTask(null);
      fetchProjectDetails();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure?")) {
      try {
        await taskService.deleteTask(taskId);
        fetchProjectDetails();
      } catch (err) {
        setError("Failed to delete task");
      }
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskService.updateTask(taskId, { status: newStatus });
      fetchProjectDetails();
    } catch (err) {
      setError("Failed to update task status");
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!memberData.userId) {
      setError("Please select a user");
      return;
    }

    try {
      await projectService.addMember(id, memberData.userId, memberData.role);
      setMemberData({ userId: "", role: "Member" });
      setShowMemberForm(false);
      fetchProjectDetails();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add member");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  if (!project)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Project not found
      </div>
    );

  const filteredTasks = {
    todo: tasks.filter((t) => t.status === "Todo"),
    inProgress: tasks.filter((t) => t.status === "In Progress"),
    done: tasks.filter((t) => t.status === "Done"),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                {project.name}
              </h1>
              <p className="text-gray-600 mt-2">{project.description}</p>
            </div>
            <button
              onClick={() => setShowTaskModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={20} />
              New Task
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="flex justify-between items-center py-4 border-t">
            <div>
              <h3 className="font-bold text-gray-800">
                Members ({project.members?.length || 0})
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.members?.map((member) => (
                  <span
                    key={member.userId?._id || member.userId || member.role}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm"
                  >
                    {member.userId?.name || "Unknown user"} - {member.role}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowMemberForm(!showMemberForm)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              <Users size={18} />
              Add Member
            </button>
          </div>

          {showMemberForm && (
            <form
              onSubmit={handleAddMember}
              className="mt-4 p-4 bg-gray-50 rounded"
            >
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={memberData.userId}
                  onChange={(e) =>
                    setMemberData({ ...memberData, userId: e.target.value })
                  }
                  placeholder="User ID"
                  className="px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <select
                  value={memberData.role}
                  onChange={(e) =>
                    setMemberData({ ...memberData, role: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded"
                >
                  <option>Member</option>
                  <option>Admin</option>
                </select>
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add Member
                </button>
                <button
                  type="button"
                  onClick={() => setShowMemberForm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Todo", "In Progress", "Done"].map((status, index) => {
            const statusKey =
              status === "Todo"
                ? "todo"
                : status === "In Progress"
                  ? "inProgress"
                  : "done";
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  {status}
                </h2>
                <div className="space-y-3">
                  {filteredTasks[statusKey].map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onEdit={(task) => {
                        setSelectedTask(task);
                        setShowTaskModal(true);
                      }}
                      onDelete={handleDeleteTask}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                  {filteredTasks[statusKey].length === 0 && (
                    <p className="text-gray-400 text-sm">No tasks</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <TaskModal
          task={selectedTask}
          isOpen={showTaskModal}
          onClose={() => {
            setShowTaskModal(false);
            setSelectedTask(null);
          }}
          onSave={selectedTask ? handleUpdateTask : handleCreateTask}
          projectMembers={project.members}
        />
      </div>
    </div>
  );
}
