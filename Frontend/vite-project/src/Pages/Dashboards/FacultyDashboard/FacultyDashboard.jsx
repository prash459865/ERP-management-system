import React, { useState } from 'react'
import './FacultyDashboard.css'
import axios from 'axios'
import { useApi } from '../../../Contexts/ApiContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



const FacultyDashboard = () => {
    const today = new Date(Date.now()); // or simply new Date()
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const navigate = useNavigate();
    const { baseURL } = useApi();
    const [allClasses, setAllClasses] = useState([])
    const [classesAssigned, setClassesAssigned] = useState([]);
    const [allNotices, setAllNotices] = useState([])
    const [selfdata, setSelfData] = useState('');
    const [ismarked, setIsMarked] = useState([]);
    const id = localStorage.getItem("userId")
    const fetchTeacherDetails = async () => {
        try {
            const response1 = await axios.post(`${baseURL}/access-teacher-details`, { id }, { withCredentials: true });
            const response2 = await axios.post(`${baseURL}/accessNotice`, { selfId: id }, { withCredentials: true })
            const response3 = await axios.post(`${baseURL}/AccessClasses`, { userId: id }, { withCredentials: true });
            setSelfData(response1.data.details)
            setIsMarked(response1.data.details.markedClassNames)
            setAllNotices(response2.data.notices);
            setAllClasses(response3.data.allClasses)

        } catch (error) {
            console.error("Error fetching teacher details:", error);
        }
    };

    useEffect(() => {
        fetchTeacherDetails();
    }, [])

    useEffect(() => {
        if (selfdata?.subjects && allClasses.length > 0) {
            const matchedClasses = allClasses.filter(cls =>
                cls.subjects.some(sub => selfdata.subjects.includes(sub))
            );
            setClassesAssigned(matchedClasses);
        }
    }, [selfdata, allClasses]);


    return (
        <div className='FacultyDashboard'>
            <h1>This is a FacultyDashboard</h1>
            <div className='personalInfo'>
                <div className='image'>Image</div>
                <div className='details'>
                    <p><strong>Name: </strong>{selfdata.name}</p>
                    <p><strong>Email: </strong>{selfdata.email}</p>
                    <p><strong>Gender: </strong>{selfdata.gender}</p>
                    <p><strong>Subjects: </strong>{`${selfdata?.subjects?.map((element, index) => (element))}, `}</p>
                </div>
            </div>
            <div className="allClassessection">
                <div className='Classes'>
                    {selfdata && selfdata.week ? (
                        Object.entries(selfdata.week).map(([day, lectures], index) => {
                            if (dayName === day) {
                                return (
                                    <div className='particularday' key={index}>
                                        <h2>All Scheduled Classes Of Today</h2>
                                        <h4>{day}</h4>
                                        {lectures.length > 0 ? (
                                            <ul>
                                                {lectures.map((lec, i) => {
                                                    return (
                                                        <li
                                                            key={i}
                                                            className={ismarked.includes(lec) ? 'afterLectureMarked' : ''}
                                                            onClick={() => {
                                                                navigate('/MarkAttendance', { state: { lec } });
                                                            }}
                                                        >

                                                            <strong>{lec}</strong>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        ) : (
                                            <p>No lectures for today</p>
                                        )}
                                    </div>
                                );
                            } else {
                                return null; // skip other days
                            }
                        })
                    ) : (
                        <p>Loading schedule...</p>
                    )}

                    <div className='all-classes' >
                        <h3>Classes in which you teach</h3>
                        {
                            classesAssigned?.map((classes, index) => (
                                <div className='assignedClassesbox' key={index}>
                                    <div className='assignedClasses' title='Click to upload marks' onClick={() => { navigate('/UploadMarks', { state: { Class: `${classes.name}${classes.section}`, selfdata: selfdata } }) }}>
                                        {classes.name}
                                        {classes.section}
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>

            </div>

            <div className='NoticeBox'>
                <h3>Notice box</h3>
                <div className='insideNoticebox'>
                    {allNotices.map((notice, index) => (
                        <div key={index} className='notice'>
                            <p><b>{notice.notice}</b></p>
                            <p>{new Date(notice.updatedAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='Lectures'>
                Upload Marks
            </div>

        </div>
    )
}

export default FacultyDashboard
