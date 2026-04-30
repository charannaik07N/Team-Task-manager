const Task = require("../models/Task");
const Project = require("../models/Project");
const asyncHandler = require("../utils/asyncHandler");

const isOverdueTask = (task, todayStart) =>
  task.dueDate && new Date(task.dueDate) < todayStart && task.status !== "Done";

// Get Dashboard Stats
exports.getDashboardStats = asyncHandler(async (req, res, next) => {
  const taskQuery = {
    $or: [{ createdBy: req.userId }, { assignedTo: req.userId }],
  };
  const projectQuery = {
    $or: [{ createdBy: req.userId }, { "members.userId": req.userId }],
  };

  const tasks = await Task.find(taskQuery);
  const projects = await Project.find(projectQuery);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Task stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Done").length;
  const pendingTasks = tasks.filter(
    (t) => t.status !== "Done" && !isOverdueTask(t, today),
  ).length;
  const overdueTasks = tasks.filter((t) => isOverdueTask(t, today)).length;

  // Project stats
  const totalProjects = projects.length;
  const completedProjects = projects.filter(
    (p) => p.status === "Completed",
  ).length;
  const pendingProjects = projects.filter((p) => p.status === "Pending").length;
  const inProgressProjects = projects.filter(
    (p) => p.status === "In Progress",
  ).length;

  res.status(200).json({
    success: true,
    stats: {
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      totalProjects,
      completedProjects,
      pendingProjects,
      inProgressProjects,
    },
  });
});

// Get Dashboard Tasks
exports.getDashboardTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find({ createdBy: req.userId })
    .populate("projectId", "name")
    .populate("assignedTo", "name email")
    .sort({ dueDate: 1, createdAt: -1 });

  res.status(200).json({
    success: true,
    tasks,
  });
});
