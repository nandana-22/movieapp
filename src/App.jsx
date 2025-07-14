import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Admin Components
import AdminLogin from './components/Adminlogin';
import AdminDashboard from './components/Admin';
import AdminUsers from './components/Adminusers';
import AdminMovies from './components/Adminmovies';
import AdminNavbar from './components/Navbaradmin';

// User Components
import Navbar from './components/Navbar';
import MovieList from './components/Movielist';
import Login from './components/Login'; 
import HomeAttractive from './components/Homeattractive';

function AppRoutes({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={
          isLoggedIn ? <Navigate to="/home" replace /> : <Login setIsLoggedIn={setIsLoggedIn} />
        }
      />

      {/* Home (after login) */}
      <Route
        path="/home"
        element={
          isLoggedIn ? (
            <>
              <Navbar setIsLoggedIn={setIsLoggedIn} />
              <HomeAttractive />
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Movies */}
      <Route
        path="/movies"
        element={
          isLoggedIn ? (
            <>
              <Navbar setIsLoggedIn={setIsLoggedIn} />
              <MovieList />
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Default route → redirect to login or home */}
      <Route
        path="/"
        element={<Navigate to={isLoggedIn ? '/home' : '/login'} replace />}
      />

      {/* ADMIN Routes */}
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <>
            <AdminNavbar />
            <AdminDashboard />
          </>
        }
      />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/movies" element={<AdminMovies />} />

      {/* 404 Page */}
      <Route path="*" element={<h2 style={{ padding: '40px' }}>404 - Not Found</h2>} />
    </Routes>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </BrowserRouter>
  );
}

export default App;
