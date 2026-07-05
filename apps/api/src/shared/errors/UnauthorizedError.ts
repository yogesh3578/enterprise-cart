import { StatusCodes } from "http-status-codes";
import { AppError } from "./AppError";
import { ErrorCode } from "./ErrorCode";

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(
      StatusCodes.UNAUTHORIZED,
      ErrorCode.UNAUTHORIZED,
      message
    );
  }
}