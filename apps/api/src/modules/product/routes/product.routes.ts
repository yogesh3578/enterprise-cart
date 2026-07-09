import { Router } from "express";

import productController from "../controller/product.controller";

import { authenticate } from "../../../core/middleware/auth/authenticate";
import { authorize } from "../../../core/middleware/auth/authorize";
import { validateRequest } from "../../../core/middleware/validation/validateRequest";

import { Role } from "../../../shared/constants/roles";

import { createProductSchema, updateProductSchema } from "../validation/product.validation";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(Role.ADMIN),
  validateRequest(createProductSchema),
  productController.create
);

router.get("/", productController.getAll);
router.get("/:id", productController.getById);

router.patch(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  validateRequest(updateProductSchema),
  productController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  productController.delete
);

router.patch(
  "/:id/restore",
  authenticate,
  authorize(Role.ADMIN),
  productController.restore
);

export default router;