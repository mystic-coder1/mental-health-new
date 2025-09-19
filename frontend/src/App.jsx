import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


import BeforeLog from './assets/beforelogin';
import StudentLogin from './assets/studentlogin';
import StudentInfo from './assets/student-info';
import DoctorLogin from './assets/doctor-login';
import DocDash from './assets/doc-dashboard';
import Community from './assets/communitypage';
import Category from './assets/category';
import Homepage from './assets/homepage';
import { Home } from 'lucide-react';




function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/" replace />} /> */}
      <Route path="/" element={<BeforeLog />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/student-info" element={<StudentInfo />} />
      <Route path="/doctor-login" element={<DoctorLogin />} />
      <Route path="/doc-dashboard" element={<DocDash />} />
      <Route path="/community" element={<Community />} />
      <Route path="/category" element={<Category />} />
    
      <Route path="*" element={<Navigate to="/student-login" replace />} />
    </Routes>
  );
}

export default App;