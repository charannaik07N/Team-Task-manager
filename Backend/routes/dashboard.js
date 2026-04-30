const express = require("express");
const auth = require("../middleware/auth");
const {
  getDashboardStats,
  getDashboardTasks,
} = require("../controllers/dashboardController");

const router = express.Router();

// Get Dashboard Stats
router.get("/", auth, getDashboardStats);
router.get("/tasks", auth, getDashboardTasks);

module.exports = router;
