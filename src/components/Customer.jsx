import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Customer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:7000/details',
        {
          headers: { Authorization: token }
        });
      console.log(response);
      setProducts(response.data);
    } catch (error) {
      console.log(error.response?.data?.error || 'Product Fetching Failed');
    }
  };

  return (
    <div>
      <h1>Customer</h1>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((prod, index) => (
          <div key={index}>
            <h2>{prod.productName}</h2>
            <p>{prod.description}</p>
            <p>Price: Rs. {prod.price}</p>
            <p>Colors: {prod.colors.join(', ')}</p>
            <p>Sizes: {prod.size.join(', ')}</p>
            <div>
              {prod.productImage.map((image, imgIndex) => (
                <img key={imgIndex} src={image} alt={prod.productName} style={{ width: '100px' }} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Customer;
