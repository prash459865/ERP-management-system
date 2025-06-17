import React from 'react'
import './SidebarPopup.css'
import { useNavigate } from 'react-router-dom'
import { IoCloseOutline } from 'react-icons/io5'

const NoticePopup = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <div className='SidebarPopup'>
        <IoCloseOutline  className='closeButton' size={24} onClick={onClose} />
      <ul>
        <li onClick={()=>{navigate('/CreateNotice')}}>Add Notice</li>
        <li onClick={()=>{navigate('/DeleteNotice')}}>Delete Notice</li>
      </ul>
    </div>
  )
}

export default NoticePopup
