import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LoginSignup from './components/LoginSignup';
import Home from './components/Home';
import Owner from './components/Owner';
import Customer from './components/Customer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="app-container">
      <Router>
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout}>Logout</button>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/owner" element={<Owner />} />
              <Route path="/customer" element={<Customer />} />

            </Routes>
          </>
        ) : (
          <>
            <LoginSignup setIsLoggedIn={setIsLoggedIn} />
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
