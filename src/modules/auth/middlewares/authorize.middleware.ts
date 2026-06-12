import type { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../../../shared/errors/ForbiddenError.js";
import type { UserRole } from "../../users/types/user.types.js";

export function authorizeMiddleware(...roles: UserRole[]) {

  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!roles.includes(req.user.role)) {
        throw new ForbiddenError();
    }
    next();
  };
}