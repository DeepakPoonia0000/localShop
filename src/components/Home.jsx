import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [shops, setShops] = useState([]);
  const [isShopOwner, setIsShopOwner] = useState(false);
  const navigate = useNavigate();

  const getShops = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:7000/shops', {
        headers: { Authorization: token }
      });

      const { data } = response;
      const [shops, role] = data;

      setShops(shops);
      setIsShopOwner(role === 'R@7yU5vK*9#L^eP&1!sF8$2B0oQmWzD4xJ%pC3gN#6T$Y');
      console.log(shops, role);
    } catch (error) {
      console.log(error, "this is the error");
      window.alert(error.response?.data?.error || 'Failed to fetch shops');
    }
  };

  useEffect(() => {
    getShops();
  }, []);

  const handleYourProductsClick = () => {
    navigate('/yourProducts');
  };

  return (
    <div>
      <h1>Shops</h1>
      {shops.length === 0 ? (
        <p>No shops found</p>
      ) : (
        <ul>
          {shops.map((shop, index) => (
            <Link to={`/shopProducts?shopName=${shop.shopName}`} key={index}>
              <li>
                <h2>{shop.shopName}</h2>
                <p>Address: {shop.address}</p>
                <p>Pincode: {shop.pincode}</p>
              </li>
            </Link>
          ))}
        </ul>
      )}
      {isShopOwner && (
        <button onClick={handleYourProductsClick}>Your Products</button>
      )}
    </div>
  );
};

export default Home;
