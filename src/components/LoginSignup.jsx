import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { userRole } from '../Redux/Slicer'

const LoginSignup = ({ setIsLoggedIn }) => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
    setRole('')
    setMessage('');
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:7000/loginShop', { email, password });
      setMessage(response.data.message);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', email);
      localStorage.setItem('role', response.data.role);
      // dispatch(userRole(response.data.role))
      setIsLoggedIn(true);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Login failed');
    }
  };

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:7000/addShop', { email, password, shopName: name, role });
      setMessage('Signup successful');
      setIsLogin(true);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Signup failed');
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className="login-signup-container">
      {isLogin ? (
        <div className="login-form">
          <h2>Login</h2>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button onClick={handleLogin}>Login</button>
          <p>
            Don't have an account? <button onClick={toggleForm}>Sign up</button>
          </p>
          {message && <p>{message}</p>}
        </div>
      ) : (
        <div className="signup-form">
          <h2>Sign Up</h2>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <input
            type="radio"
            name="role"
            value="Customer"
            onChange={handleRoleChange}
          />
          <label>Customer</label>
          <input
            type="radio"
            name="role"
            value="Owner"
            onChange={handleRoleChange}
          />
          <label>Owner</label>
          <p>Selected Role: {role}</p>
          <button onClick={handleSignup}>Sign Up</button>
          <p>
            Already have an account? <button onClick={toggleForm}>Login</button>
          </p>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
