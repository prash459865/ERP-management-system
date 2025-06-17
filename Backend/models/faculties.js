import mongoose from "mongoose";


const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  week: {
  type: Object,
  default: () => ({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  })
},
adharNumber: { type: String, required: true },
  department: { type: String },
  designation: { type: String, required: true },
  profileImage: { type: String },
  qualifications: { type: String, required: true },
  subjects: [{ type: String }],
  dateOfJoining: { type: Date, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date },
  markedClassNames:{type:Array},
  role:{type:String, default:"Faculty"}
}, {
  timestamps: true
});

export default mongoose.model("Faculty", teacherSchema);
