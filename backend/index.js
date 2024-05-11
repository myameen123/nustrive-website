import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/db.config.js";
import cors from "cors";
// import cors from " cors";
import { logger } from "./config/winston.config.js";
import questionRouter from "./routers/questions.route.js";
import mockTestRouter from "./routers/mock-test.route.js";
import authRouter from "./routers/auth.route.js";
import cloudinary from "cloudinary";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 200,
    exposedHeaders: ["Set-cookie"],
  })
);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "App is running",
  });
});

app.use("/api/question", questionRouter);
app.use("/api/mock-test", mockTestRouter);
app.use("/api/auth", authRouter);
const PORT = process.env.PORT || 5000;
databaseConnection();
app.listen(PORT, () => {
  logger.info(`Server is listning at port ${PORT}`);
});
