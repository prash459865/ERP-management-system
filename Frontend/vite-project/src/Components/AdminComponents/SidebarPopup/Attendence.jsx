import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'
const Attendence = ({ onClose }) => {
  return (
    <div className='SidebarPopup'>
        <IoCloseOutline  className='closeButton' size={24} onClick={onClose} />
      <ul>
        <li>View Student Attendence</li>
        <li>View Teacher Attendence</li>
       
      </ul>
    </div>
  )
}

export default Attendence
