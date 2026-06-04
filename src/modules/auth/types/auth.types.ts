import type { UserResponse } from "../../users/types/user.types.js";

export interface AuthResponse {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
}