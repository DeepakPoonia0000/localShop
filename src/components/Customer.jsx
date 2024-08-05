import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Customer = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    getShops();
  }, []);

  const getShops = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:7000/shops', {
        headers: { Authorization: token }
      });
      console.log(response);
      setShops(response.data);
    } catch (error) {
      console.log(error.response?.data?.error || 'Product Fetching Failed');
    }
  };

  return (
    <div>
      <h1>Customer</h1>
      {shops.map((shop, index) => (

        <Link key={index} to={`shopProducts?shopName=${shop.shopName}`}>
          <div>
            <h1>{shop.shopName}</h1>
            <h2>{shop.address}</h2>
            <p>{shop.pincode}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Customer;
