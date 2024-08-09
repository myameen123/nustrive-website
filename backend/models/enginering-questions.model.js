import mongoose, { Schema } from "mongoose";
const engineeringQuestionSchema = mongoose.Schema({
  text: String,
  image: [
    {
      public_id: String,
      url: String,
    },
  ],
  test:{type: mongoose.Schema.Types.ObjectId, ref:'EngineeringTest'},
  options: [String],
  subject: {
    type: String,
    required: [true, "Subject is required"],
    enum:['maths', 'physics','iq','chemistry','computer science']
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
