const express = require("express");
const auth = require("../middleware/auth");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

// Create Task
router.post("/", auth, createTask);

// Get Tasks
router.get("/", auth, getTasks);

// Get Single Task
router.get("/:id", auth, getTask);

// Update Task
router.put("/:id", auth, updateTask);

// Delete Task
router.delete("/:id", auth, deleteTask);

module.exports = router;
