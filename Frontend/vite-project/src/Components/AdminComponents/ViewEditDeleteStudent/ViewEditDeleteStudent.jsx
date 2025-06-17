import React, { useEffect, useState } from 'react';
import './ViewEditDeleteStudent.css';
import { useApi } from '../../../Contexts/ApiContext';
import axios from 'axios';
import FullStudentData from './FullStudentData';

const ViewEditDeleteStudent = () => {
  const [students, setStudents] = useState(null);
  const [searchName, setSearchName] = useState('');
  const { baseURL } = useApi();
  const [studentDetailsActive, setStudentDetailsActive] = useState('')

  const allStudentsData = async () => {
    try {
      const response = await axios.get(`${baseURL}/accessAllStudents`, { withCredentials: true });
      setStudents(response.data.students);
    } catch (error) {
      console.log(error, "error while fetching details");
    }
  };

  useEffect(() => {
    allStudentsData();
  }, []);

  // 🔸 Filter logic
  const filteredStudents = students?.filter(student =>
    student.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className='ViewEditDeleteStudent'>
        <h1>Search Student By Name</h1>
      <input
        className='searchBar'
        type='text'
        placeholder='Search student...'
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />

      <div className='fullList'>
        <ul className='Listheading'>
          <li>Name</li>
          <li>Class</li>
          <li>Section</li>
          <li>Father's Name</li>
          <li>Adhar No</li>
        </ul>

        {filteredStudents && filteredStudents.map((student, index) => (
          <div className='studentItem' onClick={()=>{setStudentDetailsActive(student)}} key={index}>
            <div className='StudentName'>{student.name}</div>
            <div className='StudentClass'>{student.class}</div>
            <div className='StudentSection'>{student.section}</div>
            <div className='StudentFatherName'>{student.fatherName}</div>
            <div className='StudentAdhar'>{student.adharNumber}</div>
          </div>
        ))}

        <hr />
      </div>

      {studentDetailsActive &&  (<FullStudentData  allStudentsData={ allStudentsData} student={studentDetailsActive}/>)}
    </div>
  );
};

export default ViewEditDeleteStudent;
