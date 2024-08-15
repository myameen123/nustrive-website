// import {
//   createstudent,
//   getstudentById,
// } from "../../services/student.service.js";

import {
  createTeacher,
  getTeacherById,
} from "../../services/teacher.service.js";
import { authErrors } from "../../errors/auth.error.js";
import { sendVerificationEmail } from "../../utils/email.util.js";
import {
  createStudent,
  getStudentById,
} from "../../services/student.service.js";
import { resFailure } from "../../utils/responseObject.utils.js";

export const getRoleBasedUserData = async (userType, id) => {
  let roleBasedUserData, clonedUserObject;
  switch (userType) {
    case "student":
      roleBasedUserData = await getStudentById(id);
      clonedUserObject = Object.assign({}, roleBasedUserData);
      delete clonedUserObject.password;
      return roleBasedUserData;
    case "teacher":
      roleBasedUserData = await getTeacherById(id);
      clonedUserObject = Object.assign({}, roleBasedUserData);
      delete clonedUserObject.password;
      return roleBasedUserData;
    default:
      throw new Error(authErrors.INVALID_USER_TYPE);
  }
};

export const createRoleBasedUser = async (
  res,
  email,
  password,
  name,
  userType
) => {
  try {
    console.log("auth helper", email, password, name, userType);
    switch (userType.toLowerCase()) {
      case "student":
        await createStudent(res, email, password, name);
        sendVerificationEmail(name, email);
        return;
      case "teacher":
        await createTeacher(res, email, password, name);
        sendVerificationEmail(name, email);
        break;
      default:
        throw new Error(authErrors.INVALID_USER_TYPE);
    }
  } catch (error) {
    return resFailure(res, "registration error", error);
  }
};
