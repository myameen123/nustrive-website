import mongoose from "mongoose";

const mockTestSchema = mongoose.Schema({
  title: { type: String, required: true },
  subjects: [{
      type:String, 
      enum:['maths','physics','english','iq','chemistry'],
    }],
    category:{type:String, enum:['engineering', 'business','medical'], required:true},
    duration:{type:Number, required:true},
    description: { type: String }
});

const MockTest = mongoose.model(
  "mockTest",
  mockTestSchema
);

export default MockTest;
