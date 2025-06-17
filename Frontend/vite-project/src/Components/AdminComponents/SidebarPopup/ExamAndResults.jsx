import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'

const ExamAndResults = ({ onClose }) => {
  return (
    <div className='SidebarPopup'>
        <IoCloseOutline  className='closeButton' size={24} onClick={onClose} />
      <ul>
        <li>Schedule Exams</li>
        <li>Enter / Upload Marks</li>
        <li>Publish Results</li>
      </ul>
    </div>
  )
}


export default ExamAndResults
