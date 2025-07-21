import express from "express";

import { errorHandler, notFound } from "./middleware/error.middleware";
import { authRoutes } from "./routes/auth";
import { taskRoutes } from "./routes/task";

const app = express();

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
