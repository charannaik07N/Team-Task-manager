const express = require("express");
const auth = require("../middleware/auth");
const checkProjectAccess = require("../middleware/checkProjectAccess");
const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
} = require("../controllers/projectController");

const router = express.Router();

// Create Project
router.post("/", auth, createProject);

// Get All Projects
router.get("/", auth, getProjects);

// Get Single Project
router.get("/:id", auth, checkProjectAccess, getProject);

// Update Project
router.put("/:id", auth, checkProjectAccess, updateProject);

// Delete Project
router.delete("/:id", auth, checkProjectAccess, deleteProject);

// Add Member to Project
router.post("/:id/members", auth, checkProjectAccess, addMember);

// Remove Member from Project
router.delete("/:id/members", auth, checkProjectAccess, removeMember);

module.exports = router;
