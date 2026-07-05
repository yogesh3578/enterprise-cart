import { NextFunction, Request, Response } from "express";

import authRepository from "../../../modules/auth/repository/auth.repository";

import { verifyAccessToken } from "../../../shared/utils/jwt";

import { UnauthorizedError } from "../../../shared/errors/UnauthorizedError";

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedError("Access token is missing");
    }

    const token = authHeader.split(" ")[1];

    const payload = verifyAccessToken(token);

    const user = await authRepository.findActiveUserById(
      payload.userId
    );

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch {
    next(
      new UnauthorizedError(
        "Invalid or expired access token"
      )
    );
  }
};