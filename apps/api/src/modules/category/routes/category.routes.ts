import { Router } from "express";

import categoryController from "../controller/category.controller";

import { authenticate } from "../../../core/middleware/auth/authenticate";
import { authorize } from "../../../core/middleware/auth/authorize";
import { validateRequest } from "../../../core/middleware/validation/validateRequest";

import { Role } from "../../../shared/constants/roles";

import {
  createCategorySchema,
  updateCategorySchema,
} from "../validation/category.validation";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(Role.ADMIN),
  validateRequest(createCategorySchema),
  categoryController.create
);

router.get("/", categoryController.getAll);
router.get("/slug/:slug", categoryController.getBySlug);

router.patch(
  "/:id/restore",
  authenticate,
  authorize(Role.ADMIN),
  categoryController.restore
);

router.get("/:id", categoryController.getById);

router.patch(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  validateRequest(updateCategorySchema),
  categoryController.update
);


router.delete(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  categoryController.delete
);

export default router;