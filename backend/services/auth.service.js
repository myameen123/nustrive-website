// import { db } from "../utils/db.util.js";
import { User } from "../models/user.model.js";

// import { hashToken } from "../utils/hashToken.util.js";

export const addRefreshTokenToDb = async (refreshToken, userId) => {
  return await User.findByIdAndUpdate(userId, {
    $set: {
      refreshToken: refreshToken,
    },
  });
};
// return await User.findByIdAndUpdate(
//   userId,
//   {
//     $push: {
//       refreshToken: hashToken(refreshToken),
//     },
//   },
//   { new: true }
// );

export const getRefreshTokenById = async (userId) => {
  const user = await User.findById(userId);
  return user.refreshToken;
};

// soft delete of the refresh token
export const deleteRefreshToken = async (id) => {
  return await User.findByIdAndUpdate(
    id,
    {
      $set: {
        refreshToken: null,
      },
    },
    { new: true }
  );
};

export const revokeRefreshTokens = async (userId) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        refreshToken: null,
      },
    },
    { new: true }
  );
};
