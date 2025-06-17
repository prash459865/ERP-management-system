import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'

const FeesManagement = ({ onClose }) => {
  return (
    <div className='SidebarPopup'>
        <IoCloseOutline  className='closeButton' size={24} onClick={onClose} />
      <ul>
        <li>Add Fee Structure</li>
        <li>View payments</li>
      </ul>
    </div>
  )
}

export default FeesManagement
