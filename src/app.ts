import express from "express";
import cors from "cors";
import helmet from "helmet";
import { requestId } from "./shared/middleware/request-id.js";
import { requestLogger } from "./shared/middleware/request-logger.js";
import { errorHandler } from "./shared/middleware/error-handler.js";

const app = express();

// Middleware to assign a unique request ID to each incoming request for better traceability in logs
app.use(requestId);

// Middleware to log details of each incoming request, including method, path, status code, and duration
app.use(requestLogger);

// Security Headers
app.use(helmet());

// CORS Configuration
app.use(cors());

// Body Parsing
app.use(express.json());

// Health Check Endpoint
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "healthy"
    }
  });
});

// Importing routes
import authRoutes from "./modules/auth/routes/auth.routes.js";
// Mounting routes
app.use("/api/auth", authRoutes);

// 404 Handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: "Route not found"
    }
  });
});

// Global error handler to catch and handle all errors thrown in the application
app.use(errorHandler);

export default app;