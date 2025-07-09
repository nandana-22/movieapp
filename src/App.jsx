import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminLogin from './components/Adminlogin';
import AdminDashboard from './components/Admin';
import AdminUsers from './components/Adminusers';
import AdminNavbar from './components/Navbaradmin';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/adminlogin" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AdminNavbar />
            <div style={{ flex: 1 }}>
              <AdminDashboard />
            </div>
          </div>
        }
      />

      <Route
        path="/admin/users"
        element={
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AdminNavbar />
            <div style={{ flex: 1 }}>
              <AdminUsers />
            </div>
          </div>
        }
      />

      <Route
        path="*"
        element={
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ flex: 1, padding: '40px', textAlign: 'center' }}>
              <h2>404 - Page Not Found</h2>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
