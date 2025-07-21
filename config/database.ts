import { Sequelize } from "sequelize";

import config from "./index";

export const sequelize = new Sequelize(
  config.database.name,
  config.database.username!,
  config.database.password!,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: "mysql",
    logging: config.env === "development" ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
    await sequelize.sync({ alter: true });
    console.log("Database models synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};
