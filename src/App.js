import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LoginSignup from './components/LoginSignup';
import Home from './components/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
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
