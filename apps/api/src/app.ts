import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";
import { notFound } from "./core/middleware/common/notFound";
import { logger } from "./core/logger/logger";
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

app.use("/api/v1", routes);

app.use(notFound);

app.use(errorHandler);

export default app;