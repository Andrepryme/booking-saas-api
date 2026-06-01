import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { ZodSchema } from "zod";
import { ValidationError } from "../errors/ValidationError.js";

export function validate(schema: ZodSchema): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      const fields: Record<string, string[]> = {};
      for (const issue of result.error.issues) {
        const field = issue.path.join(".");

        if (!fields[field]) {
          fields[field] = [];
        }

        let message = issue.message;
        if (issue.code === "invalid_type" && issue.input === undefined) {
          message = `${field} is required`;
        }
        fields[field].push(message);
      
      }

      return next(
        new ValidationError({ fields })
      );
    }

    req.body = result.data;
    next();
  };
}
