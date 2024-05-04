import mongoose from "mongoose";
const questionSchema = mongoose.Schema({
  text: String,
  image: [
    {
      imgId: String,
      imgUrl: String,
    },
  ],
  options: [
    {
      text: String,
      image: [
        {
          imgId: String,
          imgUrl: String,
        },
      ],
    },
  ],
  subject: {
    type: String,
    required: [true, "Subject is required"],
  },
});

const Questions = mongoose.model("question", questionSchema);
export default Questions;
