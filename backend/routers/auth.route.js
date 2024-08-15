import {
  registerValidator,
  loginValidator,
  // tokenValidator,
  // logoutValidator,
} from "../middlewares/validators/auth.validator.js";
import { validateResult } from "../utils/validationResult.util.js";
import {
  getMe,
  getAll,
  getUser,
  loginUser,
  deleteUser,
  updateUser,
  // refreshToken,
  registerUser,
  verifyEmailVerificationToken_,
} from "../controllers/auth.controller.js";
import {
  hasAuthToken,
  revokeAllRefreshTokens,
} from "../middlewares/auth/auth.middleware.js";
import express from "express";

const authRouter = express.Router();

authRouter.post("/register", registerValidator, validateResult, registerUser);
authRouter.post("/login", loginValidator, validateResult, loginUser);
authRouter.post(
  "/refresh-token",
  hasAuthToken,
  // tokenValidator,
  // validateResult,
  // refreshToken
);
authRouter.post(
  "/logout",
  // logoutValidator,
  // validateResult,
  revokeAllRefreshTokens
);


authRouter.get("/verify/:token", verifyEmailVerificationToken_);

authRouter.get("/get-me", hasAuthToken, getMe);

authRouter.get('/get-all', getAll);
authRouter.get('/:id',getUser)
authRouter.delete('/delete-user/:id', deleteUser);
authRouter.put('/update-user/:id', updateUser);


export default authRouter;
