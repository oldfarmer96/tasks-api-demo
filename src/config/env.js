import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3000),
  jwtSecret: process.env.JWT_SECRET || "insecure_dev_secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
  sqlitePath: process.env.SQLITE_PATH || "./data/app.db",
};
