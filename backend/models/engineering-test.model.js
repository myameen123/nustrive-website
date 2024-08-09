import mongoose from "mongoose";

const engineeringTestSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "EngineeringQuestions" },
  ],
});

const EngineeringTest = mongoose.model(
  "EngineeringTest",
  engineeringTestSchema
);

export default EngineeringTest;
