import mongoose from "mongoose";

const mockQuestionSchema = mongoose.Schema({
  text: String,
  image: [
    {
      public_id: String,
      url: String,
    },
  ],
  test:{type: mongoose.Schema.Types.ObjectId, ref:'MockTest'},
  options: [String],
  subject: {
    type: String,
    required: [true, "Subject is required"],
    enum:['maths', 'physics','iq','biology','chemistry','english']
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

const MockQuestion = mongoose.model(
  "MockQuestions",
  mockQuestionSchema
);
export default MockQuestion;
