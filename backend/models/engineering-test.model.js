import mongoose from "mongoose";

const engineeringTestSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  subjects: [{type:String, enum:['maths','physics','english','iq','chemistry'],
    default:['maths','physics','english','iq','chemistry']
  }],
  category:{type:String, default:'engineering'}
});

const EngineeringTest = mongoose.model(
  "EngineeringTest",
  engineeringTestSchema
);

export default EngineeringTest;
