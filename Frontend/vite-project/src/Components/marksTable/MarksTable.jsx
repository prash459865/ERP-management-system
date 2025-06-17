import React, { use, useEffect, useState } from 'react';
import './marksTable.css';
import axios from 'axios';
import { useApi } from '../../Contexts/ApiContext';

const MarksTable = ({ studentId, selfdata }) => {

  const [studentsubjects, setStudentSubjects] = useState([]);
  const { baseURL } = useApi();
  const [teacherSubjects, setTeacherSubjects] = useState([])
  const [particularSubject,setParticularSubject] = useState('')
  const [marks,setMarks] = useState({
   subjectName:'',
    UT1:'',
    UT2:'',
    HalfYearly:'',
    UT3:'',
    UT4:'',
    Final:''
  });
  console.log(particularSubject,'not cleaned')
  const accessStudentMarks = async (req, res) => {
    const response = await axios.post(`${baseURL}/access-student-marks`, { studentId:studentId._id }, { withCredentials: true })
    setStudentSubjects(response.data.student.subjects)
    setTeacherSubjects(selfdata?.subjects);
  }

  useEffect(() => {
    if (studentId) accessStudentMarks();
  }, [studentId]);
   
  const handleSubmitMarks = async()=>{
    const cleanedMarks = Object.fromEntries(Object.entries(marks).filter(([key, value]) => value !== ''));
    // console.log(cleanedMarks,"it is cleaned")
     const response = await axios.post(`${baseURL}/submit-or-edit-marks`,{marks:cleanedMarks, studentId:studentId._id, teacherId:selfdata._id},{withCredentials:true})
        if(response.data.success)
        {
          alert("Marks Updated")
        }
    }

  return (
    <div className="marksTable-container">
      {
        selfdata?.role === "Faculty" && <div className='editAndSubmit'>
        <h3>{studentId?.name?studentId.name:'Select Student'}</h3>
         <button onClick={()=>{handleSubmitMarks()}}>Submit</button>
         <select value={particularSubject}  onChange={(e)=>setParticularSubject(e.target.value)}>
          <option value="" disabled>Select Subject</option>
           {teacherSubjects.map((subject,index)=>(
            <option value={subject} key={index}>{subject}</option>
           ))}
         </select>
      </div>
      }
      <table className='marksTable'>
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
          {particularSubject&&studentsubjects
            .filter(subject => subject.subjectName === particularSubject)
            .map((subject, index) => (
              <tr key={index}>
                <td>{subject.subjectName}</td>
                <td><input  type="text" value={marks.UT1  } placeholder={subject.marks.UT1} onChange={(e)=>{setMarks({ ...marks, UT1:e.target.value,subjectName:subject.subjectName })}} /></td>
                <td><input  type="text" value={marks.UT2  } placeholder={subject.marks.UT2} onChange={(e)=>{setMarks({ ...marks, UT2: e.target.value, subjectName:subject.subjectName })}}/></td>
                <td><input  type="text" value={marks.HalfYearly  } placeholder={subject.marks.HalfYearly} onChange={(e)=>{setMarks({ ...marks, HalfYearly:  e.target.value,subjectName:subject.subjectName  })}} /></td>
                <td><input  type="text" value={marks.UT3  } placeholder={subject.marks.UT3} onChange={(e)=>{setMarks({ ...marks, UT3:e.target.value ,subjectName:subject.subjectName })}} /></td>
                <td><input  type="text" value={marks.UT4 } placeholder={subject.marks.UT4} onChange={(e)=>{setMarks({ ...marks, UT4: e.target.value,subjectName:subject.subjectName  })}}/></td>
                <td><input  type="text" value={marks.Final } placeholder={subject.marks.Final} onChange={(e)=>{setMarks({ ...marks, Final: e.target.value,subjectName:subject.subjectName  })}}/></td>
              </tr>
            ))}

        </tbody>

      </table>
    </div>
  );
};

export default MarksTable;

