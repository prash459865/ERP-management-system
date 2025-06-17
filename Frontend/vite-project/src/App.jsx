import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Welcome from './Pages/WelcomePage/Welcome';
import Login from './Pages/LoginPage/Login';
import ProtectedUI from './Components/ProtectedUi';
import CreateStudentForm from './Components/AdminComponents/CreateStudentForm/CreateStudentForm';
import CreateTeacherForm from './Components/AdminComponents/CreateTeacherForm/CreateTeacherForm';
import CreateClasses from './Components/AdminComponents/CreateClasses/CreateClasses';
import CreateNotice from './Components/AdminComponents/CreateNotice/CreateNotice';
import DeleteNotice from './Components/AdminComponents/DeleteNotice/DeleteNotice';
import ViewEditDeleteStudent from './Components/AdminComponents/ViewEditDeleteStudent/ViewEditDeleteStudent';
import EditClasses from './Components/AdminComponents/EditClasses/EditClasses';
import MarkAttendance from './Pages/Dashboards/FacultyDashboard/MarkAttendence/MarkAttendance';
import AssignedSubjects from './Components/AdminComponents/AssignedSubjects/AssignedSubjects';
import UploadMarks from './Pages/Dashboards/FacultyDashboard/UploadMarks/UploadMarks';


const AdminDashboard = lazy(() => import('./Pages/Dashboards/AdminDashboard/AdminDashboard'));
const FacultyDashboard = lazy(() => import('./Pages/Dashboards/FacultyDashboard/FacultyDashboard'));
const StudentDashboard = lazy(() => import('./Pages/Dashboards/StudentDashboard/StudentDashboard'));

import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedUI> <AdminDashboard /> </ProtectedUI>} />
          <Route path="/Faculty" element={<ProtectedUI> <FacultyDashboard />  </ProtectedUI>} />
          <Route path="/Student" element={<ProtectedUI> <StudentDashboard />  </ProtectedUI>} />
          <Route path="/createStudentForm" element={<ProtectedUI> <CreateStudentForm /> </ProtectedUI>} />
          <Route path="/CreateTeacherForm" element={<ProtectedUI> <CreateTeacherForm /> </ProtectedUI>} />
          <Route path="/CreateClasses" element={<ProtectedUI> <CreateClasses /> </ProtectedUI>} />
          <Route path="/ViewEditDeleteStudent" element={<ProtectedUI> <ViewEditDeleteStudent /> </ProtectedUI>} />
          <Route path="/EditClasses" element={<ProtectedUI> <EditClasses /> </ProtectedUI>} />
          <Route path="/MarkAttendance" element={<ProtectedUI> <MarkAttendance /> </ProtectedUI>} />
          <Route path="/CreateNotice" element={<ProtectedUI> <CreateNotice /> </ProtectedUI>} />
          <Route path="/DeleteNotice" element={<ProtectedUI> <DeleteNotice /> </ProtectedUI>} />
          <Route path="/AssignedSubjects" element={<ProtectedUI> <AssignedSubjects /> </ProtectedUI>} />
          <Route path="/UploadMarks" element={<ProtectedUI> <UploadMarks /> </ProtectedUI>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
