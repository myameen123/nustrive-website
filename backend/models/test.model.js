import mongoose from "mongoose";

const TestSchema = mongoose.Schema({
  title: { type: String, required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    refs: "Course",
    required: true,
  },
  week: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["engineering", "business", "medical"],
  },
  description: { type: String },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});

const Tests = mongoose.model("Test", TestSchema);

export default Tests;
