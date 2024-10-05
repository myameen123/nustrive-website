import mongoose from 'mongoose';

const subjectSchema = mongoose.Schema({
    title:{type:String},
    description:{type:String},
    subject:{type:String, required:true},
    week:String,
    files:[
        {type:mongoose.Schema.Types.ObjectId, refs:"Files"}
    ],
    createdBy:{type:String, required:true}
})

const SubjectFiles = mongoose.model('SubjectFiles', subjectSchema)

export default SubjectFiles;