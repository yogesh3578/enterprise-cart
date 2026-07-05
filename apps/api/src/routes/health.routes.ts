import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { sendResponse } from "../shared/utils/apiResponse";

const router = Router();

router.get("/", (_req, res) => {
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: "API is healthy",
    data: {
      status: "UP",
    },
  });
});

export default router;