import mongoose from "mongoose";
const engineeringQuestionSchema = mongoose.Schema({
  text: String,
  image: [
    {
      public_id: String,
      url: String,
    },
  ],
  options: [String],
  subject: {
    type: String,
    required: [true, "Subject is required"],
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

const EngineeringQuestions = mongoose.model(
  "EngineeringQuestions",
  engineeringQuestionSchema
);
export default EngineeringQuestions;
