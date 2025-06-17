import React, { useEffect, useState } from 'react';
import './DeleteNotice.css';
import axios from 'axios';
import { useApi } from '../../../Contexts/ApiContext';

const DeleteNotice = () => {
    const { baseURL } = useApi();
    const selfId = localStorage.getItem("userId");
    const [allNotice, setAllNotice] = useState([]);

    const accessAllNotices = async () => {
        try {
            const response = await axios.post(`${baseURL}/accessNotice`,{ selfId },{ withCredentials: true });
            setAllNotice(response.data.notices);
        } catch (error) {
            console.error("Error fetching notices:", error);
        }
    };

    const deleteParticularNotice = async (noticeId) => {
        try {
            const response = await axios.post(`${baseURL}/deleteNotice`,{ selfId, noticeId },{ withCredentials: true });
            if (response.data.success) {
                alert("Notice deleted");
                accessAllNotices(); 
            }
        } catch (error) {
            console.error("Error deleting notice:", error);
        }
    };

    useEffect(() => {
        accessAllNotices();
    }, []);

    return (
        <div className='deleteNotice'>
            
                {allNotice.map((notice, index) => (
                    <div key={index} className='particularNotice'>
                        <div>{notice.notice}</div>
                        <div>{new Date(notice.createdAt).toISOString().split('T')[0]}</div>
                        <div><button onClick={() => deleteParticularNotice(notice._id)}>Delete</button></div>
                    </div>
                ))}
            
        </div>
    );
};

export default DeleteNotice;
