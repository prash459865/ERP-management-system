import React, { useState } from 'react'
import './EditParticularAttendence.css'
import axios from 'axios'
import { useApi } from '../../../../Contexts/ApiContext'

const EditParticularAttendence = ({ studentId, selfdata }) => {
    const { baseURL } = useApi();
    const [date, setDate] = useState('')
    const [subject, setSubject] = useState('');
    const [period, setPeriod] = useState('');
    const [status,setStatus] = useState('')

    const checkAttendance = async () => {
        console.log(date, studentId, selfdata,status, subject,period,"from checkAttendance ")
        const response = await axios.post(`${baseURL}/check-particular-attendance`, { date, studentId:studentId._id,teacherId:selfdata._id, subject, period }, { withCredentials: true })
        setStatus(response.data.status);
    }

    const editAttendance = async () => {
        console.log(date, studentId, selfdata,status, subject,period,"from editAttendance ")
        const response = await axios.post(`${baseURL}/edit-particular-attendance`, { date, studentId:studentId._id,teacherId:selfdata._id, subject, period,status}, { withCredentials: true })
        if(response.data.success)
        {
            alert("Attendance Is Updated")
        }
        
    }
    return (
        <div className='EditParticularAttendence'>

            <div className='nameAndSubmit'>
                <h3>{studentId?.name ? studentId.name : 'Select Student'}</h3>
                <button onClick={()=>{editAttendance()} } >Submit</button>
            </div>

            <div className='attendanceBox' >
                <div className='date'>
                    <label >Enter Date</label>
                    <input type="date" onChange={(e) => { setDate(e.target.value) }} />
                    <input type='text' placeholder='Enter Period' onChange={(e) => { setPeriod(e.target.value) }} />
                    <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                        <option value="" disabled>Select Subject</option>
                        {selfdata.subjects.map((subject, index) => (
                            <option value={subject} key={index} >{subject}</option>
                        ))}
                    </select>
                </div>
                <div className='presentAbsentbox'>
                    <label  ><input name='attendance' value="Present" checked={status === "Present"} type="radio" onChange={(e)=>{setStatus('Present')}}/>Present</label>
                    <label ><input name='attendance' value="Absent" checked={status === "Absent"} type="radio" onChange={(e)=>{setStatus('Absent')}}/>Absent</label>
                    {/* <button onClick={()=>{checkAttendance()}}>Check</button> */}
                </div>
                <button onClick={() => { checkAttendance() }}>Check</button>
            </div>
        </div>
    )
}

export default EditParticularAttendence
