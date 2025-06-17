import React, { use, useEffect, useState } from 'react'
import './UploadMarks.css'
import { useLocation } from 'react-router-dom'
import { useApi } from '../../../../Contexts/ApiContext'
import axios from 'axios'
import MarksTable from '../../../../Components/marksTable/marksTable'
import EditParticularAttendence from '../EditParticularAttendence/EditParticularAttendence'

const UploadMarks = () => {
  const [active, setActive] = useState('')
  const [chooseStudent,setChooseStudent] = useState('');
  const { baseURL } = useApi()
  const location = useLocation()
  const { Class ,selfdata} = location.state || {};
  const [allStudents, setAllStudents] = useState([])
  const [studentId, setStudentId] = useState(null);
  console.log(selfdata,"stydent id")
  // console.log(allStudents,'from uploadmarks')

  const accessStudentdsClassWise = async () => {
    const response = await axios.post(`${baseURL}/access-Students-ClassWise`, { className: Class }, { withCredentials: true });
    setAllStudents(response.data.students)
  }

  useEffect(() => {
    accessStudentdsClassWise();
  }, [])
  return (
    <div className='UploadMarks-Container'>
      <div className='studentList'>
        <ul>
          <b>Name</b>
          <b>Class</b>
          <b>Roll Number</b>
        </ul>
        <hr />
        {
          allStudents.map((student, index) => (
            <div className={chooseStudent===student.phone?'studentChoosed':'studentInfo'} onClick={()=>{setStudentId(student);setChooseStudent(`${student.phone}`)}} key={index}  title={`Father's Name: ${student.fatherName}`}>
              <p>{student.name}</p>
              <p>{`${student.class}${student.section}`}</p>
              <p>{student.rollNumber}</p>

            </div>

          ))
        }
      </div>
      <div className='options'>
        <ul>
          <li className={active === 'MarksTable' ? 'backgroundColor' : ''} onClick={() => { setActive('MarksTable') }}>Upload Marks</li>
          <li className={active === 'EditParticularAttendence' ? 'backgroundColor' : ''} onClick={() => { setActive('EditParticularAttendence') }}>Edit particular Attendence</li>
        </ul>
        {active === 'MarksTable' && <MarksTable studentId={studentId} selfdata={selfdata} />}
        { active === 'EditParticularAttendence' && <EditParticularAttendence studentId={studentId} selfdata={selfdata}/>}
      </div>
    </div>
  )
}

export default UploadMarks
