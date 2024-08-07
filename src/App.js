import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginSignup from './components/LoginSignup';
import Home from './components/Home';
import Owner from './components/Owner';
import CustomerProducts from './components/CustomerProducts';

const App = () => {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem('token');
      const storedRole = localStorage.getItem('role');
      setToken(storedToken || '');
      setRole(storedRole || '');
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setToken('');
    setRole('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  // dpoonia0000@gmail.com
  return (
    <Router>
      <div>
        <button onClick={handleLogout}>Log Out</button>
        <Routes>
          <Route path="/" element={token ? <Navigate to="/home" /> : <LoginSignup setToken={setToken} />} />

          <Route path="/home" element={token ? <Home /> : <Navigate to="/" />} />

          <Route path="/yourProducts" element={token ? <Owner /> : <Navigate to="/" />} />

          <Route path="/showProducts" element={<CustomerProducts />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
