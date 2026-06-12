import type { UserRole } from "../../users/types/user.types.js";

export interface AuthenticatedUser {
  id: string;
  role: UserRole;
}