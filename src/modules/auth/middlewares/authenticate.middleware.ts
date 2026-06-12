import type { Request, Response, NextFunction } from "express";
import type { JwtService } from "../services/jwt.service.js";
import { UnauthorizedError } from "../../../shared/errors/UnauthorizedError.js";

export function authMiddleware(jwtService: JwtService ) {

  return (req: Request, _res: Response, next: NextFunction): void => {

    const authorization = req.headers.authorization;
    if (!authorization?.startsWith("Bearer ")) { throw new UnauthorizedError(); }

    const token = authorization.split(" ")[1];
    if (!token) { throw new UnauthorizedError(); }

    try {
        const payload = jwtService.verifyAccessToken(token);
        req.user = {
            id: payload.sub,
            role: payload.role
        };
        next();
    } catch {
        throw new UnauthorizedError();
    }
  };
}