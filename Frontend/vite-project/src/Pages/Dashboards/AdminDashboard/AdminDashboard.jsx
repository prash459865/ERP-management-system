import React, { useState } from 'react';
import './AdminDashboard.css';
import StudentPopup from '../../../Components/AdminComponents/SidebarPopup/StudentPopup';
import NoticePopup from '../../../Components/AdminComponents/SidebarPopup/NoticePopup';
import SettingsPopup from '../../../Components/AdminComponents/SidebarPopup/SettingsPopup';
import TeacherPopup from '../../../Components/AdminComponents/SidebarPopup/TeacherPopup';
import TimeTablePopup from '../../../Components/AdminComponents/SidebarPopup/TimeTablePopup';
import ClassesAndSubjects from '../../../Components/AdminComponents/SidebarPopup/ClassesAndSubjects';
import Attendence from '../../../Components/AdminComponents/SidebarPopup/Attendence';
import ExamAndResults from '../../../Components/AdminComponents/SidebarPopup/ExamAndResults';
import FeesManagement from '../../../Components/AdminComponents/SidebarPopup/FeesManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('');

  const handleMenuClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="adminNameAndIamge">
          <div className="personalImage"></div>
          <h2>Admin Name</h2>
        </div>
        <ul>
          <li onClick={() => handleMenuClick('students')}>Students</li>
          <li onClick={() => handleMenuClick('teachers')}>Teachers</li>
          <li onClick={() => handleMenuClick('ClassesAndSubjects')}>Classes & Subjects</li>
          <li onClick={() => handleMenuClick('Attendence')}>Attendence</li>
          <li onClick={() => handleMenuClick('notices')}>Notices</li>
          <li onClick={() => handleMenuClick('ExamAndResults')}>Exam & Results</li>
          <li onClick={() => handleMenuClick('timetable')}>Timetable</li>
          <li onClick={() => handleMenuClick('FeesManagement')}>Fees Management</li>
          <li onClick={() => handleMenuClick('settings')}>Settings</li>

        </ul>

      </div>

      <main className="main-content">
        <h1>Welcome, Admin!</h1>
        <p>Select an option from the sidebar to begin.</p>

        {activeTab === 'students' && (<StudentPopup onClose={() => setActiveTab('')} />)}
        {activeTab === 'teachers' && (<TeacherPopup onClose={() => setActiveTab('')} />)}
        {activeTab === 'notices' && (<NoticePopup onClose={() => setActiveTab('')} />)}
        {activeTab === 'timetable' && (<TimeTablePopup onClose={() => setActiveTab('')} />)}
        {activeTab === 'settings' && (<SettingsPopup onClose={() => setActiveTab('')} />)}
        {activeTab === 'ClassesAndSubjects' && (<ClassesAndSubjects onClose={() => setActiveTab('')} />)}
        {activeTab === 'Attendence' && (<Attendence onClose={() => setActiveTab('')} />)}
        {activeTab === 'ExamAndResults' && (<ExamAndResults onClose={() => setActiveTab('')} />)}
        {activeTab === 'FeesManagement' && (<FeesManagement onClose={() => setActiveTab('')} />)}
      </main>
    </div>
  );
};

export default AdminDashboard;
