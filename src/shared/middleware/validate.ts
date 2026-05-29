import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { ZodSchema } from "zod";
import { ValidationError } from "../errors/ValidationError.js";

export function validate(schema: ZodSchema): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(
      req.body
    );

    if (!result.success) {
      return next(new ValidationError({issues: result.error.issues }));
    }
    req.body = result.data;
    next();
  };
}
