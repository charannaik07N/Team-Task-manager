const Project = require("../models/Project");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

// Create Project
exports.createProject = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  if (!name) {
    return next(new AppError("Please provide a project name", 400));
  }

  const project = await Project.create({
    name,
    description,
    createdBy: req.userId,
    members: [{ userId: req.userId, role: "Admin" }],
  });

  res.status(201).json({
    success: true,
    project,
  });
});

// Get All Projects for Current User
exports.getProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find({
    $or: [{ createdBy: req.userId }, { "members.userId": req.userId }],
  })
    .populate("createdBy", "name email")
    .populate("members.userId", "name email");

  res.status(200).json({
    success: true,
    projects,
  });
});

// Get Single Project
exports.getProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id)
    .populate("createdBy", "name email")
    .populate("members.userId", "name email");

  if (!project) {
    return next(new AppError("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    project,
  });
});

// Update Project
exports.updateProject = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  if (req.userRole !== "Admin") {
    return next(new AppError("Only admins can update the project", 403));
  }

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { name, description },
    { new: true, runValidators: true },
  )
    .populate("createdBy", "name email")
    .populate("members.userId", "name email");

  if (!project) {
    return next(new AppError("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    project,
  });
});

// Delete Project
exports.deleteProject = asyncHandler(async (req, res, next) => {
  if (req.userRole !== "Admin") {
    return next(new AppError("Only admins can delete the project", 403));
  }

  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return next(new AppError("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
});

// Add Member to Project
exports.addMember = asyncHandler(async (req, res, next) => {
  const { userId, role } = req.body;

  if (!userId || !role) {
    return next(new AppError("Please provide userId and role", 400));
  }

  if (req.userRole !== "Admin") {
    return next(new AppError("Only admins can add members", 403));
  }

  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new AppError("Project not found", 404));
  }

  // Check if member already exists
  const memberExists = project.members.find(
    (m) => m.userId.toString() === userId,
  );
  if (memberExists) {
    return next(new AppError("Member already exists in this project", 400));
  }

  project.members.push({ userId, role });
  await project.save();

  res.status(200).json({
    success: true,
    project,
  });
});

// Remove Member from Project
exports.removeMember = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    return next(new AppError("Please provide userId", 400));
  }

  if (req.userRole !== "Admin") {
    return next(new AppError("Only admins can remove members", 403));
  }

  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new AppError("Project not found", 404));
  }

  project.members = project.members.filter(
    (m) => m.userId.toString() !== userId,
  );
  await project.save();

  res.status(200).json({
    success: true,
    project,
  });
});
