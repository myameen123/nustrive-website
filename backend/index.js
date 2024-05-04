import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/db.config.js";
import cors from "cors";
// import cors from " cors";
import { logger } from "./config/winston.config.js";
import questionRouter from "./routers/questions.route.js";
import mockTestRouter from "./routers/mock-test.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 200,
    exposedHeaders: ["Set-cookie"],
  })
);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "App is running",
  });
});

app.use("/api/question", questionRouter);
app.use("/api/mock-test", mockTestRouter);
const PORT = process.env.PORT || 5000;
databaseConnection();
app.listen(PORT, () => {
  logger.info(`Server is listning at port ${PORT}`);
});
