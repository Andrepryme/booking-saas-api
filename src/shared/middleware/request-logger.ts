import type { Request, Response, NextFunction } from "express";
import { logger } from "../logger/logger.js";

export function requestLogger( req: Request, res: Response, next: NextFunction ): void {

  const start = Date.now();
  res.on("finish", () => {
    const durationMs = Date.now() - start;
    logger.info(
      {
        requestId: req.requestId,
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        durationMs
      },
      "HTTP Request"
    );
  });

  next();
}