import dotenv from "dotenv";

dotenv.config({ path: ".env.test" }); // use the test database

import { sequelize } from "../config/database";

beforeAll(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});
