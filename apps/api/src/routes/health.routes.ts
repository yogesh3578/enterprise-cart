import { Router } from "express";
import { ApiResponse } from "../shared/utils/ApiResponse";

const router = Router();

router.get("/", (_, res) => {
  res.status(200).json(
    new ApiResponse(200, {
      status: "UP",
      timestamp: new Date().toISOString(),
    }, "API is healthy")
  );
});

export default router;