const Task = require("../models/Task");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

// Create Task
exports.createTask = asyncHandler(async (req, res, next) => {
  const {
    title,
    description,
    projectId,
    assignedTo,
    status,
    priority,
    dueDate,
  } = req.body;

  if (!title || !projectId) {
    return next(new AppError("Please provide title and projectId", 400));
  }

  // Validate due date is today or in the future (date-only comparison)
  if (dueDate) {
    const due = new Date(dueDate);
    const today = new Date();
    due.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (due < today) {
      return next(new AppError("Due date cannot be in the past", 400));
    }
  }

  const task = await Task.create({
    title,
    description,
    projectId,
    assignedTo,
    status,
    priority,
    dueDate,
    createdBy: req.userId,
  });

  res.status(201).json({
    success: true,
    task,
  });
});

// Get Tasks for Project
exports.getTasks = asyncHandler(async (req, res, next) => {
  const { projectId } = req.query;

  if (!projectId) {
    return next(new AppError("Please provide projectId", 400));
  }

  const tasks = await Task.find({ projectId })
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    tasks,
  });
});

// Get Single Task
exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id)
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email");

  if (!task) {
    return next(new AppError("Task not found", 404));
  }

  res.status(200).json({
    success: true,
    task,
  });
});

// Update Task
exports.updateTask = asyncHandler(async (req, res, next) => {
  const { title, description, status, priority, dueDate, assignedTo } =
    req.body;

  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(new AppError("Task not found", 404));
  }

  // Check if user is allowed to update
  if (
    task.createdBy.toString() !== req.userId &&
    task.assignedTo?.toString() !== req.userId
  ) {
    return next(
      new AppError("You are not authorized to update this task", 403),
    );
  }

  // Validate due date if provided (date-only comparison)
  if (dueDate) {
    const due = new Date(dueDate);
    const today = new Date();
    due.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (due < today) {
      return next(new AppError("Due date cannot be in the past", 400));
    }
  }

  // Build update object - only include fields that are provided
  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (status !== undefined) updateData.status = status;
  if (priority !== undefined) updateData.priority = priority;
  if (dueDate !== undefined) updateData.dueDate = dueDate;
  if (assignedTo !== undefined) updateData.assignedTo = assignedTo;

  task = await Task.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email");

  res.status(200).json({
    success: true,
    task,
  });
});

// Delete Task
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new AppError("Task not found", 404));
  }

  if (task.createdBy.toString() !== req.userId) {
    return next(
      new AppError("You are not authorized to delete this task", 403),
    );
  }

  await Task.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});
