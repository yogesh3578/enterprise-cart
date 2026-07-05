import { ErrorCode } from "./ErrorCode";

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly errorCode: ErrorCode,
    message: string,
    public readonly errors?: unknown
  ) {
    super(message);

    this.name = "AppError";

    Error.captureStackTrace(this, this.constructor);
  }
}