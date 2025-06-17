import React from 'react'
import './SidebarPopup.css'
import { IoCloseOutline } from 'react-icons/io5'

const TimeTablePopup = ({ onClose }) => {
  return (
    <div className='SidebarPopup'>
        <IoCloseOutline  className='closeButton' size={24} onClick={onClose} />
      <ul>
        <li>Create class Timetable</li>
        <li>View / Edit / Delete timetable</li>
      </ul>
    </div>
  )
}

export default TimeTablePopup
