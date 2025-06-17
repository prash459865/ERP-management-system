import mongoose from "mongoose";
import Faculty from "./faculties.js";


const lectureSchema = new mongoose.Schema({
  period: { type: String },
  faculty: { type: String, default: "" },
  subjectName:{type: String, default: ""},
  startTime: { type: String, default: "" },
  endTime: { type: String, default: "" }
});

const defaultLectures = [
  { period: "1" },
  { period: "2" },
  { period: "3" },
  { period: "4" },
  { period: "5" },
  { period: "6" },
  { period: "7" },
  { period: "8" }
];

const daySchema = new mongoose.Schema({
  day: { type: String },
  lectures: { type: [lectureSchema], default: defaultLectures }
});

const classeSchema = new mongoose.Schema({
  name: { type: String },
  section: { type: String },
  roomNumber: { type: String },
  floorNumber: { type: String },
  classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
  subjects: { type: Array },
  days: {
    type: [daySchema],
    default: () => [
      { day: "Monday", lectures: defaultLectures },
      { day: "Tuesday", lectures: defaultLectures },
      { day: "Wednesday", lectures: defaultLectures },
      { day: "Thursday", lectures: defaultLectures },
      { day: "Friday", lectures: defaultLectures },
      { day: "Saturday", lectures: defaultLectures }
    ]
  }
});


export default mongoose.model("Class", classeSchema);
