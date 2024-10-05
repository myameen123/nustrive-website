import mongoose from "mongoose";

const courseContentSchema = mongoose.Schema({
    course:{type:mongoose.Schema.Types.ObjectId, refs:'Course',require:false},
    test:{type:mongoose.Schema.Types.ObjectId, refs:'SubjectTest', required:false},
    week:{type:Number,required:false},
    file:{type:String, required:false},
    link:{type:String, required:false},

})

const CourseContent = mongoose.model('CourseContent', courseContentSchema);

export default CourseContent;