import mongoose from "mongoose";

const businessTestSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "BusinessQuestions" }, 
  ],
});

const BusinessTest = mongoose.model(
  "BusinessTest",
  businessTestSchema
);

export default BusinessTest;
