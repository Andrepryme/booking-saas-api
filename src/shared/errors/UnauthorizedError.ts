import { AppError } from "./AppError.js";

export class UnauthorizedError extends AppError {
  constructor(metadata?: Record<string, unknown>) {
    super(
      401,
      "UNAUTHORIZED",
      "Authentication failed",
      metadata
    );
  }
}