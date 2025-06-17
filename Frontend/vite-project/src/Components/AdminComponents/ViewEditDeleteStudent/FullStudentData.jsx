import React,{useState} from 'react'
import "./FullStudentData.css"
import MarksTableForStudents from '../../../Pages/Dashboards/StudentDashboard/MarksTableForStudents/MarksTableForStudents';
import { MdDelete } from "react-icons/md";
import { useApi } from '../../../Contexts/ApiContext';
import axios from 'axios';


const FullStudentData = ({ student, allStudentsData }) => {
  const {baseURL} = useApi();
  const attendanceData = student?.attendance || [];
  const presentCount = attendanceData.filter((a) => a.status === "Present").length;
  const absentCount = attendanceData.filter((a) => a.status === "Absent").length;
  const totalLectures = attendanceData.length;
  const percentage = totalLectures ? Math.round((presentCount / totalLectures) * 100) : 0;
  const [deleteStudent, setDeleteStudent] = useState('')
  
  const handleDeleteStudent = async() =>{
    const response = await axios.post(`${baseURL}/delete-student`,{studentId:student._id},{ withCredentials: true} )
    if(response.data.success)
    {
      alert(response.data.message)
       allStudentsData();
    }
  }
  return (
    <div className='FullStudentData'>
      <div className='heading-and-delete'>
        <h1>Details of {student.name}</h1>
        <MdDelete className='delete-student-icon' onClick={() => { setDeleteStudent("active") }} title='Delete Student' size={35} />
      </div>
      {deleteStudent && (
        <div className='deleteStudent'>
          <p>Are you sure want to delete this student?</p>
          <div>
            <button onClick={()=>{setDeleteStudent('')}}>Cancel</button>
            <button style={{backgroundColor:'red'}} onClick={()=>{handleDeleteStudent(); setDeleteStudent('')}}>Delete</button>
          </div>
        </div>
      )

      }
      {/* Personal Info */}
      <section className='StudentDetails'>
        <h2>Personal Information</h2>
        <ul>
          <li><strong>Roll Number:</strong> {student.rollNumber}</li>
          <li><strong>Class:</strong> {student.class}</li>
          <li><strong>Section:</strong> {student.section}</li>
          <li><strong>Date of Birth:</strong> {student.dateOfBirth}</li>
          <li><strong>Age:</strong> {student.age}</li>
          <li><strong>Phone Number:</strong> {student.phone}</li>
          <li><strong>Email:</strong> {student.email}</li>
          <li><strong>Address:</strong> {student.address}</li>
          <li><strong>Aadhaar Number:</strong> {student.adharNumber}</li>
          <li><strong>Fee Status:</strong></li>
          <li><strong>Extracurriculars:</strong> </li>
        </ul>
      </section>

      {/* Guardian Info */}
      <section className='StudentDetails'>
        <h2>Guardian Information</h2>
        <ul>
          <li><strong>Father's Name:</strong> {student.fatherName}</li>
          <li><strong>Mother's Name:</strong> {student.motherName}</li>
          <li><strong>Guardian Phone:</strong></li>
        </ul>
      </section>

      {/* Academic Information */}
      <section className='StudentDetails'>
        <h2>Academic Information</h2>
        <ul>
          <li><strong>Class Teacher:</strong>{student.classTeacher || ''}</li>
          <li className='student-subjects' ><strong>Subjects Enrolled:</strong>
            {
              student.subjects.map((subject, index) => (
                <div key={index}>
                  <p>{subject.subjectName},</p>
                </div>
              ))
            }
          </li>
        </ul>

        <div className='marksTableForAdmin'>
          <h3>Marks</h3>
          <MarksTableForStudents selfdata={student} />
        </div>


        <h3>Attendance</h3>
        <ul className='attendanceInfo'>
          <li><strong>Total Lectures:</strong> {student.attendance.length}</li>
          { }
          <li><strong>Present Lectures:</strong> {presentCount}</li>
          <li><strong>Absent Lectures:</strong> {absentCount} </li>
          <li><strong>Attendance %:</strong> {percentage} </li>
        </ul>
      </section>
    </div>
  )
}

export default FullStudentData
