import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { AppError } from "../../../shared/errors/AppError";
import { sendResponse } from "../../../shared/utils/apiResponse";
import { logger } from "../../logger/logger";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error(err);

  if (err instanceof AppError) {
    sendResponse(res, err.statusCode, {
      success: false,
      message: err.message,
      errors: err.errors,
    });

    return;
  }

  sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
    success: false,
    message: "Internal Server Error",
  });
};