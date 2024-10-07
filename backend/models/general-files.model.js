import mongoose from "mongoose";

const filesSchema = mongoose.Schema({
  department: { type: String, required: true },
  subject: {type:String, required:true},
  text:{type:String},
  file: [
    {
      public_id: String,
      url: String,
    },
  ],

});

const Files = mongoose.model("Files", filesSchema);

export default Files;