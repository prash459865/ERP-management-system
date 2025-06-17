import React from 'react'
import './NoticeComponent.css'

const NoticeComponent = ({onClose}) => {
  return (
    <div className='NoticePage'>
      <button className="close-btn" onClick={onClose}>Close</button>
        
    </div>
  )
}

export default NoticeComponent
