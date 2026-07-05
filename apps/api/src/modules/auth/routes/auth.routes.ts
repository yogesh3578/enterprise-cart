import { Router } from "express";

import authController from "../controller/auth.controller";
import { validateRequest } from "../../../core/middleware/validation/validateRequest";
import { loginSchema, registerSchema } from "../validation/auth.validation";

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

export default router;