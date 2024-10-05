import mongoose from "mongoose";

const subjectTestSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  subject:{type:String, required:true},
  questions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "EngineeringQuestions" },
  ],
  createBy: { type: String, required: true },
});

const SubjectTest = mongoose.model("SubjectTest", subjectTestSchema);

export default SubjectTest;
