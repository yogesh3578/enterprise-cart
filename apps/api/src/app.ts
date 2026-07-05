import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";
import authRoutes from "./modules/auth";

import { logger } from "./core/logger/logger";
import { notFound } from "./core/middleware/common/notFound";
import { errorHandler } from "./core/middleware/common/errorHandler";

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// Register routes FIRST
app.use("/api/v1", routes);

app.use("/api/v1/auth", authRoutes);

// 404 middleware AFTER all routes
app.use(notFound);

// Global error handler LAST
app.use(errorHandler);

export default app;