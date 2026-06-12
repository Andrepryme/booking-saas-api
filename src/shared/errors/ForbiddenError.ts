import { AppError } from "./AppError.js";

export class ForbiddenError extends AppError {

    constructor(metadata?: Record<string, unknown>) {
        super(
            403,
            "FORBIDDEN",
            "Forbidden: insufficient permissions",
            metadata
        );
    }
}