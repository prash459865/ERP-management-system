import React from 'react'
import './MarksTableForStudents.css'

const MarksTableForStudents = ({selfdata}) => {
  return (
    <div>
      <table className='marks-Table-for-student' >
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>UT1 (50 MM)</th>
              <th>UT2(50 MM)</th>
              <th>Half yearly(100 MM)</th>
              <th>UT3(50 MM)</th>
              <th>UT4(50 MM)</th>
              <th>Final(100 MM)</th>
            </tr>
          </thead>
          <tbody>
            {
              selfdata?.subjects?.map((item,index)=>(
                <tr key={index}>
                   <th>{item.subjectName}</th>
                   <td>{item.subjectName.UT1}</td>
                   <td>{item.subjectName.UT2}</td>
                   <td>{item.subjectName.UTHalfYearly}</td>
                   <td>{item.subjectName.UT3}</td>
                   <td>{item.subjectName.UT4}</td>
                   <td>{item.subjectName.Final}</td>        
                </tr>
              ))
            }
          </tbody>
        </table>
    </div>
  )
}

export default MarksTableForStudents
