const Project = require("../models/Project");
const AppError = require("../utils/AppError");

const checkProjectAccess = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return next(new AppError("Project not found", 404));
    }

    const member = project.members.find(
      (m) => m.userId.toString() === req.userId,
    );

    if (!member && project.createdBy.toString() !== req.userId) {
      return next(new AppError("You do not have access to this project", 403));
    }

    req.project = project;
    req.userRole = member
      ? member.role
      : project.createdBy.toString() === req.userId
        ? "Admin"
        : null;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkProjectAccess;
