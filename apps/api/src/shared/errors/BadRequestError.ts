import { StatusCodes } from "http-status-codes";

import { AppError } from "./AppError";
import { ErrorCode } from "./ErrorCode";

export class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(
      StatusCodes.BAD_REQUEST,
      ErrorCode.BAD_REQUEST,
      message
    );
  }
}