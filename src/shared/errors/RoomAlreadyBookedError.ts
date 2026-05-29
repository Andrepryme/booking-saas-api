import { AppError } from "./AppError.js";

export class RoomAlreadyBookedError extends AppError {
  constructor(metadata?: Record<string, unknown>) {
    super(
      409,
      "ROOM_ALREADY_BOOKED",
      "Room is already booked",
      metadata
    );
  }
}