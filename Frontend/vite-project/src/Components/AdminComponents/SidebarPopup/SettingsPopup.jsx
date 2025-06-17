import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import './SidebarPopup.css'
const SettingsPopup = ({ onClose }) => {
  return (
    <div className='SidebarPopup'>
        <IoCloseOutline  className='closeButton' size={24} onClick={onClose} />
      <ul>
        <li>Create Admins</li>
        <li>Change password</li>
        <li>Logout</li>
      </ul>
    </div>
  )
}

export default SettingsPopup
