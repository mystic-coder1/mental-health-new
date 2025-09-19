import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './assets/homepage';
import StudentLogin from './assets/studentlogin';
// import Category from './pages/category';
// import Community from './pages/communitypage';
// import DoctorLogin from './pages/logindoctor';
// import Counsellor from './pages/counsellor';
// import Chatbot from './pages/chatbot';
// import StudentAccount from './pages/studentaccount';
// import AR from './pages/ARpage';
// import BeforeLogin from './pages/beforelogin';
// import Session from './pages/sessionwithstudent';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/student-login" replace />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/homepage" element={<Homepage />} />
      {/* future routes go here */}
      <Route path="*" element={<Navigate to="/student-login" replace />} />
    </Routes>
  );
}

export default App;