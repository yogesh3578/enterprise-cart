import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import authService from "../service/auth.service";
import { sendResponse } from "../../../shared/utils/apiResponse";
import { asyncHandler } from "../../../shared/utils/asyncHandler";
import { refreshCookieOptions } from "@/shared/utils/cookie";

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

    res.cookie(
      "refreshToken",
      result.refreshToken,
      refreshCookieOptions
    );

    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: "Login successful",
      data: {
        accessToken: result.accessToken,
        user: result.user,
      },
    });
  });

  refresh = asyncHandler(async (req, res) => {

    const refreshToken =
      req.cookies.refreshToken;

    const tokens =
      await authService.refresh(refreshToken);

    res.cookie(
      "refreshToken",
      tokens.refreshToken,
      refreshCookieOptions
    );

    sendResponse(
      res,
      StatusCodes.OK,
      {
        success: true,
        message: "Token refreshed",
        data: {
          accessToken: tokens.accessToken,
        },
      }
    );

  });

  logout = asyncHandler(async (req, res) => {

    const refreshToken =
      req.cookies.refreshToken;

    await authService.logout(refreshToken);

    res.clearCookie(
      "refreshToken",
      refreshCookieOptions
    );

    sendResponse(
      res,
      StatusCodes.OK,
      {
        success: true,
        message: "Logout successful",
      }
    );
  });

  me = asyncHandler(async (req, res) => {
  const user = await authService.me(
    req.user!.id
  );

  sendResponse(
    res,
    StatusCodes.OK,
    {
      success: true,
      message: "User fetched successfully",
      data: user,
    }
  );
});

}

export default new AuthController();