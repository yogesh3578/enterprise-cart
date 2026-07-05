import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import authService from "../service/auth.service";
import { sendResponse } from "../../../shared/utils/apiResponse";
import { asyncHandler } from "../../../shared/utils/asyncHandler";

class AuthController {
  register = asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.register(req.body);

    sendResponse(res, StatusCodes.CREATED, {
      success: true,
      message: "User registered successfully",
      data: user,
    });
  });

  login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: "Login successful",
    data: result,
  });
});

}

export default new AuthController();