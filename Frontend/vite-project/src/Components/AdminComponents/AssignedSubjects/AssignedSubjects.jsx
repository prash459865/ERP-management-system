import React, { useState, useEffect } from 'react'
import './AssignedSubjects.css'
import axios from 'axios';
import { useApi } from '../../../Contexts/ApiContext';

const AssignedSubjects = () => {
    const { baseURL } = useApi();
    const [classId, setClassId] = useState('')
    const [active, setActive] = useState('');
    const selfId = localStorage.getItem('userId');
    const [classes, setClasses] = useState([]);
    const [className, setClassName] = useState({});
    const [addSubject, setAddSubject] = useState('');
    const [allSubjects, setAllSubjects] = useState([]);


    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.post(`${baseURL}/AccessClasses`, { userId: selfId }, { withCredentials: true });
                setClasses(response.data.allClasses || []);
            } catch (error) {
                console.error("Error fetching classes", error);
            }
        };
        fetchClasses();
    }, []);

    const fetchSubjects = async () => {
        if (!classId) return;
        try {
            const response = await axios.post(`${baseURL}/access-class-subjects`, { classId }, { withCredentials: true });
            setAllSubjects(response?.data?.classdetail?.subjects || []);
        } catch (error) {
            console.error("Error fetching subjects", error);
        }
    };

    useEffect(() => {

        if (fetchSubjects()) { fetchSubjects(); }
    }, [classId]);



    const handleAddSubject = async () => {
        if (addSubject) {
            const response = await axios.post(`${baseURL}/add-subjects-to-class`, { selfId, classId, subjectName: addSubject, className }, { withCredentials: true })
            if (response.data.success) {
                alert("Subject Added Successfully")
                fetchSubjects();
            }
            else if (response.data.message === "Subject is already added") {
                alert("Subject is already added");
            }
        }else{
            alert("Enter Subject First")
        }
    }

    return (
        <div className='AssignedSubjects-container'>
            <h2>Assign Subjects to Particular Class</h2>
            <div className='AllClasses'>
                {classes.map((value, index) => (
                    <div className={active === value ? 'particularClassAfterClick' : 'particularClass'} key={index} onClick={() => { setClassId(value._id); setActive(value); setClassName({ class: value.name, section: value.section }) }} >
                        {value.name}
                        {value.section}
                    </div>
                ))}
            </div>
            <hr />
            {/* ------------------------------------------------------------------- */}
            {<div className='lowersection'>

                <div className='subjects-list'>
                    <h2>Subjects</h2>
                    {
                        allSubjects.map((subject, index) => (
                            <ul key={index}>
                                <li>{subject}</li>
                            </ul>
                        ))
                    }
                </div>
                <div className='add-subject-box'>
                    <h2>Add Subject</h2>
                    <input type="text" placeholder='enter name' value={addSubject} onChange={(e) => { setAddSubject(e.target.value) }} />
                    <button onClick={() => { handleAddSubject() }}>Add</button>
                </div>
            </div>

            }
        </div>
    )
}

export default AssignedSubjects
