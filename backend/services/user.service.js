// import User from "../modals/user.modal";
// import { User } from "../modals/user.modal.js";

import { User } from "../models/user.model.js";

export const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const getUserById = async (id) => {
  return await User.findById(id);
};

export const updateUserVerificationStatus = async (email) => {
  return await User.findOneAndUpdate(
    { email },
    {
      isEmailVerified: true,
    },
    {
      new: true,
    }
  );
};
