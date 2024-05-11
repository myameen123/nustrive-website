import User from "../modals/user.modal.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  }).select("+password");
  if (!user) {
    return res.status(400).json({
      success: false,
      error: {
        status: true,
        message: "Invalid email or password",
      },
      // message: "Invalid email or password",
    });
  }
  console.log(user);
  const isPasswordMatch = user.password === password;
  if (!isPasswordMatch) {
    return res.status(400).json({
      success: false,
      error: {
        status: true,
        message: "Invalid email or password",
      },
      // message: "Invalid email or password",
    });
  }

  res.status(200).json({
    success: true,
    message: "Login success",
    error: {
      status: false,
      message: "Invalid email or password",
    },
  });
};
