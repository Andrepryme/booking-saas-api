export abstract class AppError extends Error {

  public readonly statusCode: number;
  public readonly code: string;
  public readonly metadata: Record<string, unknown> | undefined;

  constructor(statusCode: number, code: string, message: string,metadata?: Record<string, unknown>) {
    
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.metadata = metadata;

    Error.captureStackTrace?.(this, this.constructor);
  }
  
}