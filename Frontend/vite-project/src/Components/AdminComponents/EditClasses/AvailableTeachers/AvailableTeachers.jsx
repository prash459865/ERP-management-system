import React, { useState, useEffect } from 'react'
import './AvailableTeachers.css'
import axios from 'axios'
import { useApi } from '../../../../Contexts/ApiContext'

const AvailableTeachers = ({ setAppointTeacher }) => {
    const { baseURL } = useApi()
    const [searchValue, setSearchValue] = useState('')
    const [teachers, setTeachers] = useState([])
    console.log(teachers)
    const allTeachersData = async () => {
        try {
            const response = await axios.get(`${baseURL}/accessTeachers`, { withCredentials: true });
            setTeachers(response.data.teachers);
        } catch (error) {
            console.log(error, "error while fetching details");
        }
    };

    useEffect(() => {
        allTeachersData();
    }, []);

    const filterTeacher = teachers.filter((teacher) => teacher.name.toLowerCase().includes(searchValue.toLowerCase()))

    return (


        <div className='AvailableTeachers'>
            <h4>AvailableTeachers</h4>
            <div className='searchBaar'>
                <input type="text" placeholder='search teacher' onChange={(e) => { setSearchValue(e.target.value) }} />
            </div>
            <div className='teacherslist'>
                {
                    filterTeacher && filterTeacher.map((teacher, index) => (
                        <div key={index} className='particularTeacher' onClick={() => { setAppointTeacher({ teacherName: teacher.name, teacherId: teacher._id }) }}>
                            <div className='teacherDetail'>
                                <p><strong>Name: </strong>{teacher.name}</p>
                                <p><strong>Qualifications: </strong>{teacher.qualifications}</p>
                                <p><strong>Subjects: </strong>{teacher.subjects.join(', ')}</p>
                            </div>
                            {/* <div className='appointDays'>
                               
                                {Object.entries(teacher.week).map(([day, periods]) => (
                                    <div key={day}>
                                        <strong>{day}:</strong> {periods.length > 0 ? periods.join(', ') : ''}
                                    </div>
                                ))}
                            </div> */}
                        </div>
                    ))


                }

            </div>
        </div>
    )
}

export default AvailableTeachers
