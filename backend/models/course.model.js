import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String},
    category:{type:String, required:true},
    // teacher:{type:mongoose.Schema.Types.ObjectId, refs:'User', required:true},
    teacher:{type:String, required:true}
    
})

const Course = mongoose.model('Course', courseSchema)

export default Course;