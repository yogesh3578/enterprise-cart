import mongoose from "mongoose";
import { logger } from "../logger/logger";

export const gracefulShutdown = (): void => {
  const shutdown = async (signal: string) => {
    logger.info(`${signal} received. Shutting down...`);

    await mongoose.connection.close();

    logger.info("MongoDB disconnected");

    process.exit(0);
  };

  process.on("SIGINT", () => shutdown("SIGINT"));

  process.on("SIGTERM", () => shutdown("SIGTERM"));
};