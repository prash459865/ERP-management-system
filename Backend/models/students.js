import mongoose from "mongoose";
import Class from "./classes.js";

const attendanceSchema = new mongoose.Schema({
    date:{type:String},
    status:{type:String,enum:['Present', 'Absent'],required:true},
    subjectName:{type:String},
    period:{type:String}
})

const subjectSchema = new mongoose.Schema({
     subjectName:{type:String},
     marks:{
        UT1:{type:Number},
        UT2:{type:Number},
        HalfYearly:{type:Number},
        UT3:{type:Number},
        UT4:{type:Number},
        Final:{type:Number},
     }
})

const studentSchema = new mongoose.Schema({
    name:{type:String, required:true},
    password : {type:String,required:true},
    rollNumber : {type:Number, required:true},
    class:{type:String,required:true},
    phone: { type: String ,required:true},
    subjects:[subjectSchema],
    profileImage :{type:String},
    session : {type:String,required:true},
    age : {type:Number,required:true},
    adharNumber : {type:Number,required:true},
    section : {type:String,required:true},
    fatherName :{type:String,required:true},
    motherName : {type:String,required:true},
    address : {type:String,required:true},
    attendance:[attendanceSchema],
    college : {type:String,required:true},
    role:{type:String, default:"Student"}
})

export default mongoose.model("Student", studentSchema);