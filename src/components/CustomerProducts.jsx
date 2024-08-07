// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// const CustomerProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [lowerRange , setLowerRange] = useState(0)
//   const [upperRange , setUpperRange] = useState(10000000)
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const shopName = searchParams.get('shopName');

//   useEffect(() => {
//     getProducts();
//   }, []);

//   const getProducts = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:7000/details', {
//         headers: { Authorization: token },
//         params: {
//           shopName: shopName
//         }
//       });
//       console.log(response);
//       setProducts(response.data);
//     } catch (error) {
//       console.log(error.response?.data?.error || 'Product Fetching Failed');
//     }
//   };

//   return (
//     <div>
//       <h1>Shop Name: {shopName}</h1>
        
//       {products.length === 0 ? (
//         <p>No products available.</p>
//       ) : (
//         products.map((prod, index) => (
//           <div key={index}>
//             <h2>Name: {prod.productName}</h2>
//             <p>Details: {prod.description}</p>
//             <p>Price: Rs. {prod.price}</p>
//             <p>Colors: {prod.colors.join(' ')}</p>
//             <p>Sizes: {prod.size.join(' ')}</p>
//             <div>
//               {prod.productImage.map((image, imgIndex) => (
//                 <img key={imgIndex} src={image} alt={prod.productName} style={{ width: '100px' }} />
//               ))}
//             </div>
//             <p>Date Added: {new Date(prod.timeOfAdding).toLocaleString()}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default CustomerProducts;






import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CustomerProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [lowerRange, setLowerRange] = useState(0);
  const [upperRange, setUpperRange] = useState(Infinity); // Initialize with Infinity for no upper limit initially
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shopName = searchParams.get('shopName');

  useEffect(() => {
    getProducts();
  }, []); // Fetch products on component mount

  useEffect(() => {
    filterProducts();
  }, [lowerRange, upperRange, products]); // Re-filter products whenever the range or products change

  const getProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:7000/details', {
        headers: { Authorization: token },
        params: {
          shopName: shopName
        }
      });
      console.log(response);
      setProducts(response.data);
      setFilteredProducts(response.data); // Initialize filtered products
    } catch (error) {
      console.log(error.response?.data?.error || 'Product Fetching Failed');
    }
  };

  const filterProducts = () => {
    const filtered = products.filter(product => 
      product.price >= lowerRange && product.price <= upperRange
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <h1>Shop Name: {shopName}</h1>

      <div>
        <label>
          Lower Price Range: 
          <input
            type="number"
            value={lowerRange}
            onChange={(e) => setLowerRange(Number(e.target.value))}
          />
        </label>
        <label>
          Upper Price Range: 
          <input
            type="number"
            value={upperRange === Infinity ? '' : upperRange}
            onChange={(e) => setUpperRange(e.target.value ? Number(e.target.value) : Infinity)}
          />
        </label>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products available.</p>
      ) : (
        filteredProducts.map((prod, index) => (
          <div key={index}>
            <h2>Name: {prod.productName}</h2>
            <p>Details: {prod.description}</p>
            <p>Price: Rs. {prod.price}</p>
            <p>Colors: {prod.colors.join(' ')}</p>
            <p>Sizes: {prod.size.join(' ')}</p>
            <div>
              {prod.productImage.map((image, imgIndex) => (
                <img key={imgIndex} src={image} alt={prod.productName} style={{ width: '100px' }} />
              ))}
            </div>
            <p>Date Added: {new Date(prod.timeOfAdding).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CustomerProducts;
