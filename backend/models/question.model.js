import mongoose from "mongoose";
const QuestionSchema = mongoose.Schema({
  text: String,
  image: [
    {
      public_id: String,
      url: String,
    },
  ],
  test: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessTest" },
  options: [String],
  subject: {
    type: String,
    required: [true, "Subject is required"],
    enum: ["english", "maths", "iq",'physics','chemistry','computer science'],
  },
  correctAnswer: String,
  isSaved: {
    type: Boolean,
    default: false,
  },
  isReviewed: {
    type: Boolean,
    default: false,
  },
});

const Questions = mongoose.model(
  "Question",
  QuestionSchema
);
export default Questions;
