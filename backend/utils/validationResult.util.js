import { validationResult } from "express-validator";

export const validateResult = (req, res, next) => {
  console.log(req.body);
  console.log("in validateResult");
  const result = validationResult(req);
  console.log(result);
  if (!result.isEmpty()) {
    console.log(result);
    const errors = result.errors;
    res.status(400).json({
      success: false,
      message: errors[0].msg,
    });
  } else {
    next();
  }
};
