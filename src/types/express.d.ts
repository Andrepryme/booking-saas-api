import type { AuthenticatedUser } from "../modules/auth/types/authenticated-user.types.js";

declare global {
  namespace Express {
    interface Request {
      requestId: string;
      user?: AuthenticatedUser;
      cookies?: Record<string, string>;
    }
  }
}

export {};