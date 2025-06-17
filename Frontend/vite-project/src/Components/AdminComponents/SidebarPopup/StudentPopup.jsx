import React from 'react'
import './SidebarPopup.css'
import CreateStudentForm from '../CreateStudentForm/CreateStudentForm'
import ViewEditDeleteStudent from '../ViewEditDeleteStudent/ViewEditDeleteStudent'
import { useNavigate } from 'react-router-dom'
import { IoCloseOutline } from 'react-icons/io5'

const StudentPopup = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className='SidebarPopup'>
      <IoCloseOutline  className='closeButton' size={24} onClick={onClose} />
      <ul>
        <li onClick={() => navigate('/createStudentForm')} >Add new student</li>
        <li onClick={() => navigate('/ViewEditDeleteStudent')}>View / Edit / Delete Students</li>
        <li>Promote to Next Class</li>
      </ul>
    </div>
  )
}

export default StudentPopup
