const express = require("express");
const cors = require("cors");

const authRoutes = require("./services/auth-service/authRoutes");
const taskRoutes = require("./services/task-service/taskRoutes");
const userRoutes = require("./services/user-service/userRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "TaskFlow API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
