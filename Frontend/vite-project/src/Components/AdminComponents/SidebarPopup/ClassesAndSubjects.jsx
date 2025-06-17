import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoCloseOutline } from 'react-icons/io5';

const ClassesAndSubjects = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className='SidebarPopup'>
      <IoCloseOutline  className='closeButton' size={24} onClick={onClose} />
      <ul>
        <li onClick={() => navigate('/CreateClasses')}>Create Class</li>
        <li onClick={()=> navigate('/EditClasses')}>View/ Edit/ Delete classes</li>
        <li onClick={()=> navigate('/AssignedSubjects')}>Assign subjects to class</li>
        <li>Assign Teacher to class</li>
      </ul>
    </div>
  )
}

export default ClassesAndSubjects
