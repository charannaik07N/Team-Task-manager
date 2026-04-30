const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");

const isOverdueTask = (task, todayStart) =>
  task.dueDate && new Date(task.dueDate) < todayStart && task.status !== "Done";

// Get Dashboard Stats
exports.getDashboardStats = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find({ createdBy: req.userId });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Done").length;
  const pendingTasks = tasks.filter(
    (t) => t.status !== "Done" && !isOverdueTask(t, today),
  ).length;

  const overdueTasks = tasks.filter((t) => isOverdueTask(t, today)).length;

  res.status(200).json({
    success: true,
    stats: {
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
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
