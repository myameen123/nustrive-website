import { validationResult } from "express-validator";

export const validateResult = (req, res, next) => {
  console.log('in validateResult',req.body);
  const result = validationResult(req);
  console.log('1. result',result);
  if (!result.isEmpty()) {
    console.log('2. result',result);
    const errors = result.errors;
    res.status(400).json({
      success: false,
      message: errors[0].msg,
    });
  } else {
    next();
  }
};
