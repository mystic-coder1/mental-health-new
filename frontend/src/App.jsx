import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import StudentLogin from './assets/studentlogin';
import StudentInfo from './assets/student-info';
import DoctorLogin from './assets/doctor-login';
import DocDash from './assets/doc-dashboard';
import Community from './assets/communitypage';




function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/student-login" replace />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/student-info" element={<StudentInfo />} />
      <Route path="/doctor-login" element={<DoctorLogin />} />
      <Route path="/doc-dashboard" element={<DocDash />} />
      <Route path="/community" element={<Community />} />
    
      <Route path="*" element={<Navigate to="/student-login" replace />} />
    </Routes>
  );
}

export default App;