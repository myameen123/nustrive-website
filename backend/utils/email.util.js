import nodemailer from "nodemailer";
import ejs from "ejs";

import { generateEmailVerificationToken } from "./jwt.util.js";
import { logger } from "../config/winston.config.js";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});

const mailConfigurations = (userName, to) => {
  const emailVerificationToken = generateEmailVerificationToken(to);
  const url = `http://${process.env.HOST}:${process.env.PORT}/api/auth/verify/${emailVerificationToken}`;
  return {
    from: process.env.SENDER_EMAIL,
    to,
    subject: "Nustrive - Email Verification",
    html: ejs.render(
      `
    <html>
      <body>
        <h3>Hello <%= userName %></h3>
        <p>Thanks for registering our website. Please follow the given link to verify your email</p>
        <a href=<%= url %>>Click here to verify your email!</a>
        <p>Thanks</p>
      </body>
    </html>
  `,
      { userName, url }
    ),
  };
};

export const sendVerificationEmail = (userName, to) => {
  transporter.sendMail(
    mailConfigurations(userName, to, (error, info) => {
      if (error) {
        logger.error(error.message);
        throw new Error(error);
      }
      logger.info(info);
    })
  );
};
