import { StatusCodes } from "http-status-codes";

import { AppError } from "./AppError";
import { ErrorCode } from "./ErrorCode";

export class ForbiddenError extends AppError {
  constructor(
    message = "Forbidden"
  ) {
    super(
      StatusCodes.FORBIDDEN,
      ErrorCode.FORBIDDEN,
      message
    );
  }
}