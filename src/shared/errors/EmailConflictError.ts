import { AppError } from "./AppError.js";

export class EmailConflictError extends AppError {
  constructor(metadata?: Record<string, unknown>) {
    super(
      409,
      "EMAIL_CONFLICT_ERROR",
      "Email already exists",
      metadata
    );
  }
}