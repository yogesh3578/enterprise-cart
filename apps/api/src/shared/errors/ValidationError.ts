import { StatusCodes } from "http-status-codes";

import { AppError } from "./AppError";
import { ErrorCode } from "./ErrorCode";

export class ValidationError extends AppError {
  constructor(
    message = "Validation Failed",
    errors?: unknown
  ) {
    super(
      StatusCodes.UNPROCESSABLE_ENTITY,
      ErrorCode.VALIDATION_ERROR,
      message,
      errors
    );
  }
}