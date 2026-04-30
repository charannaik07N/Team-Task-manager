const express = require("express");
const { body } = require("express-validator");
const auth = require("../middleware/auth");
const { register, login, getMe } = require("../controllers/authController");

const router = express.Router();

// Register
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  register,
);

// Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login,
);

// Get Current User
router.get("/me", auth, getMe);

module.exports = router;
