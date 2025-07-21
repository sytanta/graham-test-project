import app from "./app";
import config from "./config";
import { connectDatabase } from "./config/database";

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(config.port, () => {
      console.log(
        `Task Management API listening at http://localhost:${config.port}`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
