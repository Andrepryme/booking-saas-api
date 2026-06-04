import { AppError } from "./AppError.js";

export class InvalidCredentialsError extends AppError {

  constructor() {
    super(
      401,
      "INVALID_CREDENTIALS",
      "Invalid email or password"
    );
  }
}