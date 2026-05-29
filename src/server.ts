import app from "./app.js";
import { env } from "./config/env.js";

const server = app.listen(env.PORT, () => {
  console.log(
    `Server running on port ${env.PORT}`
  );
});

function shutdown(signal: string) {
  console.log(`${signal} received. Shutting down...`);

  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
}

// Handle termination signals for graceful shutdown
process.on(
  "SIGINT",
  () => shutdown("SIGINT")
);

//  Handle SIGTERM signal for graceful shutdown (e.g., when using process managers or container orchestration)
process.on(
  "SIGTERM",
  () => shutdown("SIGTERM")
);

// Handle uncaught exceptions and unhandled promise rejections to prevent the application from crashing
process.on(
  "uncaughtException",
  (error) => {
    console.error("Uncaught Exception:", error);
    shutdown("UNCAUGHT_EXCEPTION");
  }
);

// Handle unhandled promise rejections to prevent the application from crashing
process.on(
  "unhandledRejection",
  (reason) => {
    console.error("Unhandled Rejection:", reason);
    shutdown("UNHANDLED_REJECTION");
  }
);