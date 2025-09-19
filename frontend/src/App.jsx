import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import StudentLogin from './assets/studentlogin';




function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/student-login" replace />} />
      <Route path="/student-login" element={<StudentLogin />} />
    
      <Route path="*" element={<Navigate to="/student-login" replace />} />
    </Routes>
  );
}

export default App;