import type { Request, Response, NextFunction } from "express";

import { randomUUID } from "crypto";

export function requestId( req: Request, _res: Response, next: NextFunction ): void {
  req.requestId = randomUUID();
  next();
}