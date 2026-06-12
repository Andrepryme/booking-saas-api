import { AppError } from "./AppError.js";

export class PropertyNotFoundError extends AppError {

  constructor(metadata?: Record<string, unknown>) {
    super(
      404,
      "PROPERTY_NOT_FOUND",
      "Property not found",
      metadata
    );
  }
}