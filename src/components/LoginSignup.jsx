import React, { useState } from 'react';
import axios from 'axios';

const LoginSignup = ({setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [shopName, setShopName] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:7000/loginUser', { email, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token)
      localStorage.setItem('role', response.data.role);
      console.log(response)
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed');
    }
  };

  const handleSignup = async () => {
    const userData = { email, password, role };
    if (role === 'shop') {
      userData.role = 'R@7yU5vK*9#L^eP&1!sF8$2B0oQmWzD4xJ%pC3gN#6T$Y'
      Object.assign(userData, { name, shopName, pincode, address, location });
    } else{
      userData.role = 'jI$3Mv@8kP&lD6G#9oK!uS^zW0YdR*L1fT7W#bNp8qXvE$2'
    }
    try {
      const response = await axios.post('http://localhost:7000/addUser', userData);
      localStorage.setItem('role', response.data.newUser.role);
      console.log(response.data.newUser)
      // alert('Signup successful');
    } catch (error) {
      console.error('Signup failed:', error);
      // alert('Signup failed');
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
            placeholder="Name"
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
            type="text"
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
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </>
      )}
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default LoginSignup;
