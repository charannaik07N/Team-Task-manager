  const express = require("express");
  const cors = require("cors");
  require("dotenv").config();

  const connectDB = require("./Db");
  const authRoutes = require("./routes/auth");
  const projectRoutes = require("./routes/projects");
  const taskRoutes = require("./routes/tasks");
  const dashboardRoutes = require("./routes/dashboard");
  const { errorHandler } = require("./middleware/errorHandler");

  const app = express();
  const path = require("path");

  // Middleware
  app.use(express.json());
  app.use(
    cors({
    origin: [
      "http://localhost:5173", 
      "http://localhost:5174",
      "https://team-task-manager-production-646c.up.railway.app"
    ],
  // Serve static files from Frontend build
  app.use(express.static(path.join(__dirname, "public"))),

  // Routes
  app.use("/api/auth", authRoutes),
  app.use("/api/projects", projectRoutes),
  app.use("/api/tasks", taskRoutes),
  app.use("/api/dashboard", dashboardRoutes);

  // Health check routes
  app.get("/health", (req, res) => {
    res.json({ status: "Server is running" });
  });

  app.get("/", (req, res) => {
    res.send("API is running");
  });

  // Ignore favicon requests
  app.get("/favicon.ico", (req, res) => res.status(204).end());

  // SPA fallback: serve index.html for all non-API GET routes
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  // Error handling middleware
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });

  // Connect DB separately
  connectDB()
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.error("MongoDB Error:", err.message);
    });
  // update
