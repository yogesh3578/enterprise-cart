import { Router } from "express";

import authController from "../controller/auth.controller";
import { validateRequest } from "../../../core/middleware/validation/validateRequest";
import { loginSchema, registerSchema } from "../validation/auth.validation";
import { authenticate } from "@/core/middleware/auth/authenticate";
import { authorize } from "@/core/middleware/auth/authorize";
import { Role } from "@/shared/constants/roles";

const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register
);

router.post(
  "/login",
  validateRequest(loginSchema),
  authController.login
);

router.post(
    "/refresh",
    authController.refresh
);

router.post(
    "/logout",
    authController.logout
);


router.get(
  "/admin",

  authenticate,

  authorize(Role.ADMIN),

  (_, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

router.get(
  "/me",

  authenticate,

  authController.me
);

export default router;