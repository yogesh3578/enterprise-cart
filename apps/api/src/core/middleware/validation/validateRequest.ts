import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

import { sendResponse } from "../../../shared/utils/apiResponse";

export const validateRequest =
  (schema: ZodObject) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        sendResponse(res, StatusCodes.BAD_REQUEST, {
          success: false,
          message: "Validation failed",
          errors: error.flatten(),
        });

        return;
      }

      next(error);
    }
  };