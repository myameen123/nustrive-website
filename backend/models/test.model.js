import { time } from "console";
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
  period: {
    hours: { type: Number, default: 0 },  // Store the hours part of the duration
    minutes: { type: Number, default: 0 }, // Store the minutes part of the duration
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});

const Tests = mongoose.model("Test", TestSchema);

export default Tests;
