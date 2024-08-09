import { logger } from "../../config/winston.config.js";
import { revokeRefreshTokens } from "../../services/auth.service.js";
import { verifyAccessToken } from "../../utils/jwt.util.js";
// import { resFailure, resSuccess } from "../../utils/responseObject.util.js";
import jwt from "jsonwebtoken";
import { authErrors } from "../../errors/auth.error.js";
import { resSuccess, resFailure } from "../../utils/responseObject.utils.js";
import { User } from "../../models/user.model.js";
// import { http } from "winston";

export const hasAuthToken = async (req, res, next) => {
  // if (!req.headers.authorization) {
  //   return resFailure(res, authErrors.INVALID_AUTH_HEADER, {}, 403);
  // }
  console.log("in hasAuthToken");
  try {
    // console.log(req.cookies);
    const token =
      req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return resFailure(res, "Unauthorized request", {}, 401);
    }
    // console.log("token", token);
    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    if (!decodedToken) {
      return resFailure(res, "Token decoded Error", {}, 401);
    }
    // console.log("decodedToken", decodedToken);
    const user = await User.findById(decodedToken?.userId).select(
      "-password -refreshToken"
    );
    // console.log(user);
    if (!user) {
      // TODO: discuss about frontend
      return resFailure(res, "Invalid Access Token", {}, 401);
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return resFailure(res, authErrors.TOKEN_EXPIRED, {}, 401);
      // throw new Error(err.name);
    }
    console.log(err);
    throw new Error("Unauthorized");
  }
};

export const revokeAllRefreshTokens = async (req, res, next) => {
  try {
    const { userId } = req.body;
    console.log(userId);
    // await revokeRefreshTokens(parseInt(userId));
    // return resSuccess(res, `All tokens revoked for userId: ${userId}`);
    await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          refreshToken: null,
        },
      },
      { new: true }
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    console.log("logout");
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        message: "All tokens revoked",
      });
  } catch (err) {
    console.log(err);
    logger.error(err);
    next(err);
  }
};

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifiedToken = verifyAccessToken(token);
    req.payload = verifiedToken;
  } catch (err) {
    logger.error(err.message);
    if (err.message === "TokenExpiredError") {
      return resFailure(res, authErrors.TOKEN_EXPIRED, {}, 401);
    }
    return resFailure(res, authErrors.UNAUTHORIZED, {}, 401);
  }
};
