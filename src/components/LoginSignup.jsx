import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoginSignup = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [shopName, setShopName] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState({
    longitude: null,
    latitude: null
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      alert('Invalid email format');
      return;
    }
    if (password.length < 6) {
      alert('Password should be at least 6 characters long');
      return;
    }
    try {
      const response = await axios.post('http://localhost:7000/loginUser', { email, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      localStorage.setItem('role', response.data.role);
      console.log(response);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed');
    }
  };

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      alert('Invalid email format');
      return;
    }
    if (password.length < 6) {
      alert('Password should be at least 6 characters long');
      return;
    }
    if (role === 'shop' && pincode.length < 6) {
      alert('Pincode should be at least 6 digits long');
      return;
    }

    const userData = { email, password, role };
    if (role === 'shop') {
      console.log("location =>", location)
      userData.role = 'R@7yU5vK*9#L^eP&1!sF8$2B0oQmWzD4xJ%pC3gN#6T$Y';
      Object.assign(userData, { name, shopName, pincode, address, location });
    } else {
      userData.role = 'jI$3Mv@8kP&lD6G#9oK!uS^zW0YdR*L1fT7W#bNp8qXvE$2';
    }
    try {
      console.log(userData)
      const response = await axios.post('http://localhost:7000/addUser', userData);
      localStorage.setItem('role', response.data.newUser.role);
      console.log(response.data.newUser);

    } catch (error) {
      console.error('Signup failed:', error);

    }
  };


  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          const { latitude, longitude } = position.coords;
          setLocation({
            longitude: `${longitude}`,
            latitude: `${latitude}`
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Error getting location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser');
    }
  };

  return (
    <div>
      <h1>Login/Signup</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="customer">Customer</option>
        <option value="shop">Shop</option>
      </select>
      {role === 'shop' && (
        <>
          <input
            type="text"
            placeholder="Owner's Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Shop Name"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div>
            <input
              type="text"
              placeholder="Location"
              value={location}
              readOnly
            />
            <button onClick={getLocation}>Get Location</button>
          </div>
        </>
      )}
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default LoginSignup;
