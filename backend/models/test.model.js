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
  duration: { 
    type: Number, required:true 
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});

const Tests = mongoose.model("Test", TestSchema);

export default Tests;
