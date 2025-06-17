import React from 'react'
import './SidebarPopup.css'
import CreateTeacherForm from '../CreateTeacherForm/CreateTeacherForm'
import { useNavigate } from 'react-router-dom'
import { IoCloseOutline } from 'react-icons/io5'

const TeacherPopup = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <div className='SidebarPopup'>
       <IoCloseOutline  className='closeButton' size={24} onClick={onClose} />
      <ul>
        <li onClick={()=>{navigate('/CreateTeacherForm')}}>Add Teacher</li>
        <li>View / Edit / Delete Teachers</li>
        <li>Assign Subjects/Classes</li>
      </ul>
    </div>
  )
}

export default TeacherPopup
