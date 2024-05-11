import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
    maxLength: [100, "Your name cannot exceed 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    trim: true,
    maxLength: [100, "Your email cannot exceed 100 characters"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: [6, "Your password must be at least 6 characters"],
    select: false,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
// export default mongoose.models.User || mongoose.model("User", userSchema);
