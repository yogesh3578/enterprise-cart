import { StatusCodes } from "http-status-codes";

import { AppError } from "./AppError";
import { ErrorCode } from "./ErrorCode";

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(
      StatusCodes.CONFLICT,
      ErrorCode.CONFLICT,
      message
    );
  }
}