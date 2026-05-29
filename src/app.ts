import express from "express";
import cors from "cors";
import helmet from "helmet";
import { requestId } from "./shared/middleware/request-id.js";
import { requestLogger } from "./shared/middleware/request-logger.js";

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

export default app;