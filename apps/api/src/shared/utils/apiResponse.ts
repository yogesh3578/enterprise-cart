import { Response } from "express";
import { ApiResponse } from "../interfaces/ApiResponse";

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  response: ApiResponse<T>
): Response => {
  return res.status(statusCode).json({
    ...response,
    timestamp: new Date().toISOString(),
  });
};