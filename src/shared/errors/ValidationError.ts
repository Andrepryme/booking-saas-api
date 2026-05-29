import { AppError } from "./AppError.js";

export class ValidationError extends AppError {
  constructor(metadata?: Record<string, unknown>) {
    super(
      400,
      "VALIDATION_ERROR",
      "Validation failed",
      metadata
    );
  }
}