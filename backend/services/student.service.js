import bcrypt from "bcrypt";

// import { db } from "../utils/db.util.js";
import { User, Student } from "../models/user.model.js";
import { resFailure, resSuccess } from "../utils/responseObject.utils.js";

export const createStudent = async (
  res,
  email,
  password,
  name
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("password: ", password, "hashedPassword: ", hashedPassword);

    const user = await User.create({
      email,
      password: hashedPassword,
      name: name,
      role: "student",
    });

    console.log("User created:", user);

    // Create the student with user id reference
    const student = await Student.create({
      id: user._id,
    });

    console.log("Student created:", student);

    console.log("student service", email, password, name);
    return resSuccess(res, "User added to the system success", student);
  } catch (error) {
    return resFailure(res, "registration error", error);
    // ret
    // throw error;
  }
};

export const getStudentById = async (id) => {
  return await User.findById(id);
};
