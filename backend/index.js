import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/db.config.js";
// import cors from " cors";
import { logger } from "./config/winston.config.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "App is running",
  });
});
const PORT = process.env.PORT || 5000;
databaseConnection();
app.listen(PORT, () => {
  logger.info(`Server is listning at port ${PORT}`);
});
