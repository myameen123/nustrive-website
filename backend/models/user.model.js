import mongoose from "mongoose";
// import bcrypt from "bcrypt";

// Base User Schema
const userSchema = new mongoose.Schema(
  {
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
    avatar: {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
    role: {
      type: String,
      default: "student",
      enum: ["admin", "student", "teacher"],
    },
    refreshToken: {
      type: String,
      required: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    grade: {
      type: String,
      required: false,
    },
    school: {
      type: String,
      required: false,
    },
    preparationLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: false,
    },
    targetScore: {
      type: Number,
      required: false,
    },
    subjects: {
      type: [String],
      required: false,
    },
    testDate: {
      type: Date,
      required: false,
    },
    yearsOfExperience: {
      type: Number,
      required: false,
    },
    nustPreparationExperience: {
      type: Number,
      required: false,
    },
    subjectsTutored: {
      type: [String],
      required: false,
    },
    successRate: {
      type: Number,
      required: false,
    },
  },
  

  {
    timestamps: true,
    // discriminatorKey: "role",
  }
);

const User = mongoose.model("User", userSchema);

// Student Schema
const studentSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  grade: {
    type: String,
    required: false,
  },
  school: {
    type: String,
    required: false,
  },
  preparationLevel: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: false,
  },
  targetScore: {
    type: Number,
    required: false,
  },
  subjects: {
    type: [String],
    required: false,
  },
  testDate: {
    type: Date,
    required: false,
  },
});

// Teacher Schema
const teacherSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: false,
  },
  yearsOfExperience: {
    type: Number,
    required: false,
  },
  nustPreparationExperience: {
    type: Number,
    required: false,
  },
  subjectsTutored: {
    type: [String],
    required: false,
  },
  successRate: {
    type: Number,
    required: false,
  },
});

// Create the Student and Teacher models using discriminator
// const Student = User.discriminator("student", studentSchema);
// const Teacher = User.discriminator("teacher", teacherSchema);
const Student = mongoose.model("Student", studentSchema);
const Teacher = mongoose.model("Teacher", teacherSchema);

export { User, Student, Teacher };
