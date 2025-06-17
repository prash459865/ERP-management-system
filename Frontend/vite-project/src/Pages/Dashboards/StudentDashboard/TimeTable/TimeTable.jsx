import React, { useEffect, useState } from 'react'
import './TimeTable.css'
import { useApi } from '../../../../Contexts/ApiContext'
import axios from 'axios';

const TimeTable = ({selfdata}) => {
  const {baseURL} = useApi();
   const[timeTable,setTimeTable] = useState([])
  

  const accessTimeTable = async()=>{
      const response = await axios.post(`${baseURL}/access-time-table`,{selfdata},{withCredentials:true})
      setTimeTable(response?.data?.timeTable)
  }
  useEffect(()=>{
    accessTimeTable();
  },[selfdata])
  return (
    <div>
        <table>
  <thead>
    <tr>
      <th>Day</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
      <th>6</th>
      <th>7</th>
      <th>8</th>
    </tr>
  </thead>
  <tbody>
    {timeTable.map((dayObj, index) => (
      <tr key={index}>
        <th>{dayObj.day}</th>
        {dayObj.lectures.map((lecture, i) => (
          <td className='lectureBox' key={i}>
            <p><strong>{lecture.subjectName}</strong></p>
            <p>{lecture.faculty}</p>
            <p>{lecture.startTime}</p>
            <p>{lecture.endTime}</p>
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>

    </div>
  )
}

export default TimeTable
