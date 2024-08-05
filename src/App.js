// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginSignup from './components/LoginSignup';
// import Home from './components/Home';
// import Owner from './components/Owner';
// import CustomerProducts from './components/CustomerProducts';

// const App = () => {
//   const [token, setToken] = useState('');
//   const [role, setRole] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = () => {
//       const storedToken = localStorage.getItem('token');
//       const storedRole = localStorage.getItem('role');
//       setToken(storedToken || '');
//       setRole(storedRole || '');
//       setLoading(false);
//     };

//     checkAuth();
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     setToken('');
//     setRole('');
//   };

//   if (loading) {
//     return <div>Loading...</div>; 
//   }

//   return (
//     <Router>
//       <div>
//         <button onClick={handleLogout}>Log Out</button>
//         <Routes>
//           {token === '' ? (
//             <Route path="/" element={<LoginSignup />} />
//           ) : (
//             <>
//               <Route path="/" element={<Home />} />
//               <Route path="/yourProducts" element={<Owner />} />
//               <Route path="/showProducts" element={<CustomerProducts />} />
//             </>
//           )}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;









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
          <Route path="/" element={token ? <Navigate to="/home" /> : <LoginSignup setToken={setToken}/>} />
          <Route path="/home" element={token ? <Home /> : <Navigate to="/" />} />
          <Route path="/yourProducts" element={token && role === 'R@7yU5vK*9#L^eP&1!sF8$2B0oQmWzD4xJ%pC3gN#6T$Y' ? <Owner /> : <Navigate to="/" />} />
          <Route path="/showProducts" element={token && role === 'jI$3Mv@8kP&lD6G#9oK!uS^zW0YdR*L1fT7W#bNp8qXvE$2' ? <CustomerProducts /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
