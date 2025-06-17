import React,{useState} from 'react';
import "./CreateNotice.css";
import axios from 'axios';
import { useApi } from '../../../Contexts/ApiContext';
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';


const CreateNotice = () => {
  const navigate = useNavigate();
 const [notice, setNotice] = useState('');
 const {baseURL} = useApi();
 const selfId = localStorage.getItem('userId')
  const submitNotice = async()=>{
    const response = await axios.post(`${baseURL}/create-notice`,{notice,selfId},{withCredentials:true})
  }
  return (
    <div className='CreateNotice'>
      
      <h2>Create Notice</h2>
      
      <div className='noticebox'>
        <IoCloseOutline  className='closeButton' size={24} onClick={()=>navigate(-1)} />
        <label>
          Notice
          <textarea placeholder='Write Notice...' value={notice} onChange={(e)=>{setNotice(e.target.value)}}/>
        </label>
        <button onClick={()=>{submitNotice();navigate('/deleteNotice')}}>Post</button>
      </div>
    </div>
  );
};

export default CreateNotice;
