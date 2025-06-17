import React from 'react'
import './MarkAttendance.css'
import { useApi } from '../../../../Contexts/ApiContext';
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';


const MarkAttendance = () => {
    const { baseURL } = useApi();
    const location = useLocation();
    const [date, setDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });
    const [allAttendance, setAllAttendance] = useState({});
    const lecture = location.state?.lec;
    const lectureDetails = lecture.split(',');
    const [allStudents, setAllStudents] = useState([])
    const today = new Date().toISOString().split('T')[0];
    const selfId = localStorage.getItem("userId")

    const accessStudentdsClassWise = async () => {
        const response = await axios.post(`${baseURL}/access-Students-ClassWise`,{className: lectureDetails[1]}, { withCredentials: true });
        setAllStudents(response.data)
    }

    useEffect(() => {
        accessStudentdsClassWise();
    }, [])

    const attendanceChange = (studentId, status) => {
        setAllAttendance((prev) => ({
            ...prev,
            [studentId]: {
                date: date,
                status: status
            }
        }))
    }

    const submitAttendance = async (req, res) => {
        const response = await axios.post(`${baseURL}/submit-Class-Attendance`, { lectureDetails, selfId, allAttendance }, { withCredentials: true })
        if (response.data.success) {
            alert("Attendance marked for all students.")
        }
    }
    return (
        <div className='MarkAttendance'>
            <div className='dateAndHeading'>
                <input type="date" value={date} onChange={(e) => { setDate(e.target.value) }} />
                <h1>{lectureDetails[1]}</h1>
            </div>
            <div className='studentsList'>

                <div className='heading'>
                    <h3>Name</h3>
                    <h3>Roll No</h3>
                    <h3>Attendance</h3>
                </div>
                {
                    allStudents.map((student, index) => (
                        <div key={index} className='particularStudent'>
                            <p> {student.name}</p>
                            <p>{student.rollNumber}</p>
                            <div>
                                <label><input type="radio" name={`attendance-${index}`} onChange={() => { attendanceChange(student._id, 'Present') }} value="present" />present</label>
                                <label><input type="radio" name={`attendance-${index}`} onChange={() => { attendanceChange(student._id, 'Absent') }} value="absent" />Absent</label>
                            </div>
                        </div>
                    ))
                }
            </div>
            <button onClick={() => { submitAttendance() }} >Submit</button>
        </div>
    )
}

export default MarkAttendance
