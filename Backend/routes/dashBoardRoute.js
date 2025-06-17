import express from "express"
import protectedRoute from "../middlewares/authmiddleware.js";
import { createStudent,deleteStudent } from "../controllers/dashboardController/adminDashboard.js";
import { CreateTeacher } from "../controllers/dashboardController/adminDashboard.js";
import { CreateClass } from "../controllers/dashboardController/adminDashboard.js";
import { accessAllStudents } from "../controllers/dashboardController/adminDashboard.js";
import { AccessAllClasses } from "../controllers/dashboardController/adminDashboard.js";
import { updateLecture } from "../controllers/dashboardController/adminDashboard.js";
import { accessTeachers } from "../controllers/dashboardController/adminDashboard.js";
import { accessTeacherDetail } from "../controllers/dashboardController/facultyDashboard.js";
import { accessStudentsClassWise } from "../controllers/dashboardController/facultyDashboard.js";
import { markClassAttendance } from "../controllers/dashboardController/facultyDashboard.js";
import { createNotice } from "../controllers/dashboardController/adminDashboard.js";
import { accessNotice } from "../controllers/dashboardController/adminDashboard.js";
import { deleteNotice } from "../controllers/dashboardController/adminDashboard.js";
import { accessStudentdetails } from "../controllers/dashboardController/studentDashboard.js";
import { addSubjectToClass } from "../controllers/dashboardController/adminDashboard.js";
import { accessParticularClass } from "../controllers/dashboardController/adminDashboard.js"; 
import { accessStudentMarks } from "../controllers/dashboardController/facultyDashboard.js";
import { submitOrEditMarks } from "../controllers/dashboardController/facultyDashboard.js";
import { checkParticularAttendance } from "../controllers/dashboardController/facultyDashboard.js";
import { editParticularAttendance } from "../controllers/dashboardController/facultyDashboard.js";
import { accessTimeTable } from "../controllers/dashboardController/studentDashboard.js";

const router = express.Router();

router.post('/new-studentCreation',protectedRoute,createStudent)
router.post("/new-facultyCreation",protectedRoute, CreateTeacher);
router.post("/new-classCreation",protectedRoute, CreateClass);
router.post("/AccessClasses",protectedRoute, AccessAllClasses);
router.get("/accessAllStudents",protectedRoute , accessAllStudents);
router.get('/accessTeachers',protectedRoute,accessTeachers)
router.post("/update-lecture",protectedRoute,updateLecture)
router.post('/access-teacher-details',protectedRoute,accessTeacherDetail)
router.post('/access-Students-ClassWise',protectedRoute,accessStudentsClassWise)
router.post('/submit-Class-Attendance',protectedRoute,markClassAttendance)
router.post('/create-notice',protectedRoute,createNotice)
router.post('/accessNotice',protectedRoute,accessNotice)
router.post('/deleteNotice',protectedRoute,deleteNotice)
router.post('/accessStudentdetails',protectedRoute,accessStudentdetails)
router.post('/add-subjects-to-class',protectedRoute,addSubjectToClass)
router.post('/access-class-subjects',protectedRoute,accessParticularClass)
router.post('/access-student-marks',protectedRoute,accessStudentMarks)
router.post('/submit-or-edit-marks',protectedRoute,submitOrEditMarks)
router.post('/check-particular-attendance',protectedRoute,checkParticularAttendance)
router.post('/edit-particular-attendance',protectedRoute,editParticularAttendance)
router.post('/access-time-table',protectedRoute,accessTimeTable)
router.post('/delete-student',protectedRoute,deleteStudent)

export default router;
accessStudentsClassWise
