import React, { useState,useEffect } from 'react';
import './ParticularClass.css'
import { useApi } from '../../../../Contexts/ApiContext';
import axios from 'axios';
import { IoCloseOutline } from 'react-icons/io5';


const ParticularClass = ({nameAndSection, data,appointTeacher,setAppointTeacher }) => {
  const { baseURL } = useApi();
  const [editLecture, setEditLecture] = useState(false)
  const [newLecture, setNewLecture] = useState({
    period: '',
    subjectName: '',
    faculty: '',
    startTime: '',
    endTime: '',
  });
  console.log(newLecture,"from particular class  abcd")
  const updateLecture = async () => {
    const response = await axios.post(`${baseURL}/update-lecture`, newLecture, { withCredentials: true })
    if (response.data.message) {
      alert("Lecture updated")
      
    }

  }

   useEffect(() => {
  if (appointTeacher.teacherId && appointTeacher.teacherName) {
    setNewLecture((prev) => ({
      ...prev,
      faculty: appointTeacher.teacherName,
      teacherId: appointTeacher.teacherId
    }));
  }
}, [appointTeacher]);

  return (
    <div className='ParticularClass'>
      <div className='dayandtimetable' >
        <div className='daysname'>
          <p>M</p><p>T</p> <p>W</p><p>T</p><p>F</p><p>S</p>
        </div>
        <div className='periodNameAtTop'>
          <div className='periodName'><p>1</p><p>2</p> <p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p></div>
          <div className="timetable-grid">
            {data.days.map((value, index) => (
              <div key={index} className="timetable">
                { 
                  <div className='particularDay'>
                    {
                      value.lectures.map((item, index) => (

                        <div key={index} className='particularLecture' onClick={() => { setEditLecture(true);setAppointTeacher({teacherName:'',teacherId:''}); setNewLecture({ ...item, day: value.day, nameAndSection:nameAndSection }); }}>
                          
                          <p><strong>{item.subjectName}</strong></p>
                          <p><strong>{item.faculty}</strong></p>
                          <p>{item.startTime}</p>
                          <p> {item.endTime}</p>

                        </div>
                      ))
                    }
                  </div>
                }
                <hr />
              </div>
            ))}
          </div>
        </div>

      </div>
      {
        editLecture && (<div className='addLecture'>
           <IoCloseOutline className='closeButton' onClick={()=>{setEditLecture(false); setAppointTeacher({teacherName:'',teacherId:''});}} size={35} color="black" />
          <h3>Edit Lecture</h3>
          <input type="text"  value={newLecture.day} readOnly/>
          <input type="text"  value={newLecture.period} readOnly />
          <input type="text" placeholder='Subject Name' value={newLecture.subjectName} onChange={(e) => setNewLecture({ ...newLecture, subjectName: e.target.value })} />
          <label >* Select from right side</label>
          <input type="text" placeholder={newLecture.faculty}  value={appointTeacher.teacherName} readOnly />
          <input type="text" placeholder='Start Time' value={newLecture.startTime} onChange={(e) => setNewLecture({ ...newLecture, startTime: e.target.value })} />
          <input type="text" placeholder='End Time' value={newLecture.endTime} onChange={(e) => setNewLecture({ ...newLecture, endTime: e.target.value })} />
          <button onClick={() => {updateLecture();}}>
            Update Lecture
          </button>
        </div>)
      }
    </div>
  );
};

export default ParticularClass;
