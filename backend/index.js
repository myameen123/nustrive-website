import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/db.config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logger } from "./config/winston.config.js";
import mockTestRouter from "./routers/mock-test.route.js";
import authRouter from "./routers/auth.route.js";// authRouter;
import engineeringuqQestionRouter from "./routers/engineering-questions.route.js";
import engineeringTestRouter from './routers/engineering-test.route.js';
import businessQuestioRouter from './routers/business-questions.route.js';
import businessTestRouter from './routers/business-test.route.js'
import cloudinary from "cloudinary";

// import { cookie } from "express-validator";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    origin: process.env.FRONTEND_URL, // Allow requests from this origin
    // origin: "https://nustrive.vercel.app", // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 200,
    exposedHeaders: ["Set-cookie"],
  })
);
app.use((err, req, res, next) => {
  console.log("error............", err);
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});
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

app.use("/api/mock-test", mockTestRouter);
app.use("/api/question/engineering", engineeringuqQestionRouter);
app.use('/api/test/engineering', engineeringTestRouter)
app.use('/api/question/business', businessQuestioRouter)
app.use('/api/test/business',businessTestRouter)
console.log("in index.js");
app.use("/api/auth", authRouter);

console.log("after authRouter");
const PORT = process.env.PORT || 5000;
databaseConnection();
app.listen(PORT, () => {
  logger.info(`Server is listning at port ${PORT}`);
});
