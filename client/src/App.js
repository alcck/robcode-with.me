import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StudentView from './pages/StudentView'; // Create this page file for the student sandbox
import TeacherView from './pages/TeacherView'; // The teacher dashboard we just built

function App() {
  // Toggle user state for testing (role: 'student' or 'teacher')
  const [user, setUser] = useState({ name: 'Almina', role: 'teacher' });

  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white flex flex-col">
        {/* Top Navbar */}
        <Navbar user={user} onLogout={() => setUser(null)} />

        {/* Main Content Router */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<StudentView />} />
            <Route path="/teacher" element={<TeacherView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;