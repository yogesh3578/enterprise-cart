import { ErrorCode } from "./ErrorCode";

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly errorCode: ErrorCode,
    message: string
  ) {
    super(message);

    this.name = "AppError";

    Error.captureStackTrace(this, this.constructor);
  }
}