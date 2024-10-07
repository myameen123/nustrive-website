import mongoose from "mongoose";

const courseContentSchema = mongoose.Schema({
    title:{type:String, required:true},
    course:{type:String ,require:true},
    week:{type:String,required:true},
    // test:{type:mongoose.Schema.Types.ObjectId, refs:'test', required:false},
    file: [
        {
          public_id: String,
          url: String,
        },
        //   required:false
      ],
    link:{type:String, required:false},

})

const CourseContent = mongoose.model('CourseContent', courseContentSchema);

export default CourseContent;