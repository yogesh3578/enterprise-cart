import { StatusCodes } from "http-status-codes";

import { AppError } from "./AppError";
import { ErrorCode } from "./ErrorCode";

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(
      StatusCodes.NOT_FOUND,
      ErrorCode.NOT_FOUND,
      message
    );
  }
}