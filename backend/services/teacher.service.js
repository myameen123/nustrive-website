import bcrypt from "bcrypt";
import { Teacher, User } from "../models/user.model.js";

// import { db } from "../utils/db.util.js";

export const createTeacher = async (
  res,
  email,
  password,
  name
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      name: name,
      role: "teacher",
    });

    console.log("User created:", user);

    // Create the teacher with user id reference
    const teacher = await Teacher.create({
      id: user._id,
    });

    console.log("teacher created:", teacher);

    console.log("teacher service", email, password, name);
    // return teacher;
    return resSuccess(res, "User added to the system success", teacher);
  } catch (error) {
    return resFailure(res, "registration error", error);
    // throw error;
  }

  // return { user, teacher };
};

export const getTeacherById = async (id) => {
  return await db.teacher.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
};
