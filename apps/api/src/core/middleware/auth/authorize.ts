import { NextFunction, Request, Response } from "express";

import { Role } from "../../../shared/constants/roles";
import { ForbiddenError } from "../../../shared/errors/ForbiddenError";

export const authorize =
  (...roles: Role[]) =>
  (
    req: Request,
    _res: Response,
    next: NextFunction
  ): void => {
    if (!req.user) {
      throw new ForbiddenError("User not authenticated");
    }

    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError(
        "You don't have permission to perform this action"
      );
    }

    next();
  };