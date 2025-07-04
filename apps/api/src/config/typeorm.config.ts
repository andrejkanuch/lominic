import { DataSource } from "typeorm";
import { config } from "dotenv";
import * as path from "path";

// Load environment variables
config();

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "lominic_user",
  password: process.env.DB_PASSWORD || "lominic_password",
  database: process.env.DB_NAME || "lominic_dev",
  entities: [path.join(__dirname, "../**/*.entity{.ts,.js}")],
  migrations: [path.join(__dirname, "../migrations/*{.ts,.js}")],
  synchronize: false,
  logging: process.env.NODE_ENV === "development",
});
