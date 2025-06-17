import React, { useEffect, useState } from 'react'
import './StudentDashboard.css'
import AttendancePieChart from '../../../Components/AttendencePieChart/AttendencePieChart'
import axios from 'axios'
import { useApi } from '../../../Contexts/ApiContext'
import MarksTableForStudents from './MarksTableForStudents/MarksTableForStudents'
import TimeTable from './TimeTable/TimeTable'

const StudentDashboard = () => {
  const { baseURL } = useApi()
  const [selfdata, setSelfData] = useState([]);
  const selfId = localStorage.getItem('userId');
  const [allNotices, setAllNotices] = useState([]);
  const [classStudents, setClassStudents] = useState([]);
  const className = `${selfdata.class}${selfdata.section}`
  // console.log(classStudents,"get the students")
  const fetchStudent = async () => {
    const response1 = await axios.post(`${baseURL}/accessStudentdetails`, { selfId }, { withCredentials: true })
    setSelfData(response1.data.details);
    const response2 = await axios.post(`${baseURL}/accessNotice`, { selfId }, { withCredentials: true })
    setAllNotices(response2.data.notices);
  }

  const fetchClassmates = async () => {
    const response = await axios.post(`${baseURL}/access-Students-ClassWise`, { className }, { withCredentials: true });
    setClassStudents(response.data.students);
  }

  useEffect(() => {
    fetchStudent();
  }, [])

  useEffect(() => {
    if (selfdata.class && selfdata.section) {
      fetchClassmates();
    }

  }, [selfdata])

  return (

    <div className='StudentDashboard'>
      <h1>Personal Dashboard</h1>
      <div className='PersonalDetails'>
        <div className='personalImage'>
          <img src='https://imgv3.fotor.com/images/homepage-feature-card/Random-image-generator_5.jpg' />
        </div>
        <div className='personalInfo'>
          <div><strong>Name:</strong>{selfdata.name}</div>
          <div><strong>Roll No:</strong>{selfdata.rollNumber}</div>
          <div><strong>Class Teacher:</strong></div>
          <div><strong>House:</strong> Red</div>
          <div><strong>Rank:</strong> 2</div>
          <div><strong>Class:</strong>{`${selfdata.class}${selfdata.section}`}</div>
        </div>
      </div>

      <div className='totalAttendence'>
        <AttendancePieChart selfdata={selfdata} />
      </div>

      <div >
        <MarksTableForStudents selfdata={selfdata} />
      </div>

      <div className='todayTimetable'>
        <TimeTable selfdata={selfdata} />
      </div>

      <div className='NoticeBox-container'>
        <h3>Notice box</h3>
        <div className='noticeBox'>
          {allNotices.map((notice, index) => (
            <div key={index} className='notice'>
              <p><b>{notice.notice}</b></p>
              <p>{new Date(notice.updatedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='subjectAndClassmates'>
        <div className='MySubjects' >
          <h3>Subject's Name</h3>
          <div className='subjectBox'>
            {
            selfdata?.subjects.map((subjectName,index)=>(
              <div key={index} className='particularSubject'>
                 <p>{subjectName.subjectName}</p>
              </div>
            ))
          }
          </div>
        </div>
        <div className='Classmates'>
          <h3>Classmates</h3>
          <div className='ClassmatesBox'>
            {
            classStudents.map((student, index) => (
              <div key={index} className='particularClassmate' >
                <p title='Name'><strong>{student.name}</strong></p>
                <p title='roll Number'>{student.rollNumber}</p>
              </div>
              
            ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
