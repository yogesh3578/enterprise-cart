import app from "./app";
import { gracefulShutdown } from "./core/bootstrap/gracefulShutdown";
import { env } from "./core/config/env";
import { connectDatabase } from "./core/database/mongodb";
import { logger } from "./core/logger/logger";

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(env.PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${env.PORT}`);
  });

  gracefulShutdown();
};

startServer().catch((error) => {
  logger.error(error);

  process.exit(1);
});