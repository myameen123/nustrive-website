import { v4 } from "uuid";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { logger } from "../config/winston.config.js";
import { resSuccess, resFailure } from "../utils/responseObject.utils.js";
import {
  getUserByEmail,
  getUserById,
  updateUserVerificationStatus,
} from "../services/user.service.js";
import {
  generateTokens,
  verifyRefreshToken,
  verifyEmailVerificationToken,
  verifyAccessToken,
} from "../utils/jwt.util.js";
import {
  addRefreshTokenToDb,
  deleteRefreshToken,
  getRefreshTokenById,
} from "../services/auth.service.js";
import { authErrors } from "../errors/auth.error.js";
import {
  createRoleBasedUser,
  getRoleBasedUserData,
} from "./helpers/auth.helper.js";
// import { hashToken } from "../utils/hashToken.util.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password, name, userType = "student" } = req.body;

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return resFailure(res, authErrors.EMAIL_ALREADY_REGISTERED);
    }

    // console.log("auth controller", req.body);
    createRoleBasedUser(res, email, password, name, userType);
    // console.log(student, user);
  } catch (err) {
    logger.error(err);
    console.log(err.message)
    if (err.message === authErrors.INVALID_USER_TYPE) {
      return resFailure(res, authErrors.INVALID_USER_TYPE);
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return resFailure(res, authErrors.EMAIL_NOT_REGISTERED, {}, 403);
    }
    if (!user.isEmailVerified) {
      return resFailure(res, authErrors.EMAIL_NOT_VERIFIED);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return resFailure(res, authErrors.INCORRECT_PASSWORD, {}, 403);
    }

    const jwtid = v4();
    const { accessToken, refreshToken } = generateTokens(user, jwtid);

    await addRefreshTokenToDb(refreshToken, user._id);

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    // const roleBasedUserData = await getRoleBasedUserData(
    //   user.userType,
    //   user.id
    // );
    // return resSuccess(res, "Login Successful", {
    //   ...roleBasedUserData,
    //   accessToken,
    //   refreshToken,
    // });
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        user: loggedInUser,
        accessToken,
        refreshToken,
        message: "Login Successful",
      });
  } catch (err) {
    logger.error(err);
    if (err.message === authErrors.INVALID_USER_TYPE) {
      return resFailure(res, authErrors.INVALID_USER_TYPE);
    }
    next(err);
  }
};

// this is for generating a new access and refresh token once the access token expires
export const refreshToken = async (req, res, next) => {
  try {
    const incomingRefreshToken =
      req.cookies?.refreshToken ||
      req.body?.refreshToken ||
      req.headers?.authorization?.split(" ")[1];
    if (!incomingRefreshToken) {
      return resFailure(res, authErrors.UNAUTHORIZED, {}, 401);
    }
    // console.log("here");
    const verifiedJwt = verifyRefreshToken(incomingRefreshToken);
    const existingRefreshToken = await getRefreshTokenById(verifiedJwt.userId);
    if (
      !existingRefreshToken ||
      existingRefreshToken.revoked === true ||
      incomingRefreshToken !== existingRefreshToken
    ) {
      // TODO delete these refresh tokens
      return resFailure(res, authErrors.UNAUTHORIZED, {}, 401);
    }
    const user = await getUserById(verifiedJwt.userId);
    if (user.deletedAt) {
      // TODO delete these refresh tokens
      return resFailure(res, authErrors.UNAUTHORIZED, {}, 401);
    }

    // await deleteRefreshToken(existingRefreshToken.id);

    const jwtid = v4();
    const { accessToken, refreshToken } = generateTokens(user, jwtid);
    await addRefreshTokenToDb(refreshToken, user.id);
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        accessToken,
        refreshToken,
        message: "Tokens refreshed successfully",
      });
  } catch (err) {
    logger.error(err.message);
    if (err.message === "TokenExpiredError") {
      return resFailure(res, authErrors.TOKEN_EXPIRED, {}, 401);
    }
    return resFailure(res, authErrors.UNAUTHORIZED, {}, 401);
  }
};

export const verifyEmailVerificationToken_ = async (req, res) => {
  try {
    console.log("inside verifyEmailVerificationToken_",req.params);
    const { token } = req.params;
    const { email } = verifyEmailVerificationToken(token);

    const user = getUserByEmail(email);
    if (!user) {
      return resFailure(res, authErrors.EMAIL_NOT_REGISTERED);
    }

    if (user.isEmailVerified) {
      return resFailure(res, authErrors.EMAIL_ALREADY_VERIFIED);
    }
    await updateUserVerificationStatus(email);

    return resSuccess(res, "Email Verified Successfully");
  } catch (err) {
    logger.error(err.message);
    if (err.message === "TokenExpiredError") {
      return resFailure(res, authErrors.TOKEN_EXPIRED, {}, 401);
    }
    return resFailure(res, authErrors.UNAUTHORIZED, {}, 401);
  }
};

export const getAll = async (req, res) => {
  try {
    const users = await User.find();
    // console.log('users in controller:', users);
    return res.json(users);
  } catch (err) {
    logger.error(err.message);
  }
};


export const getMe = async (req, res, next) => {
  try {
    // const accessToken = req.cookie?.accessToken||req.headers.authorization.split(" ")[1];
    // const verifiedAccessToken = verifyAccessToken(accessToken);
    // const user = await getUserById(verifiedAccessToken.userId);
    // const allUsers = await User.find({});
    const user = req.user;
    if (!user) {
      return resFailure(res, authErrors.UNAUTHORIZED);
    }
    if (!user.isEmailVerified) {
      return resFailure(res, authErrors.EMAIL_NOT_VERIFIED);
    }
    // const roleBasedUserData = await getRoleBasedUserData(
    //   user.userType,
    //   user.id
    // );
    return resSuccess(res, "User data returned successfully", {
      user,
    });
  } catch (err) {
    logger.error(err.message);
    if (err.message === "TokenExpiredError") {
      return resFailure(res, authErrors.TOKEN_EXPIRED, {}, 401);
    } else if (err.message === authErrors.INVALID_USER_TYPE) {
      return resFailure(res, authErrors.INVALID_USER_TYPE, {}, 401);
    }
    return resFailure(res, authErrors.UNAUTHORIZED, {}, 401);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: "Server error occured." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // const id = req.params.id;
    const user = await User.findByIdAndDelete({ _id: req.params.id });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    console.log("deleted");
    return res.status(200).json({ message: "Successfully user deleted." });
  } catch (err) {
    console.log("err.message: ", err.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    if (!user) {
      console.log("1.update");
      return res.status(404).json({ message: "User not found." });
    }
    console.log("req.body", req.body);
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updateUser) {
      console.log("2.update");
      return res.status(400).json({ message: "User not Updated" });
    }
    console.log("updated");
    return res.json(updateUser);
  } catch (err) {
    console.log("err.message: ", err.message);
  }
};
