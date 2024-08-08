// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// const Home = () => {
//   const [shops, setShops] = useState([]);
//   const [isShopOwner, setIsShopOwner] = useState(false);
//   const [pincode, setPincode] = useState('');
//   const navigate = useNavigate();

//   const getShops = async (pincode = '') => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:7000/shops', {
//         headers: { Authorization: token },
//         params: { pincode }
//       });

//       const { data } = response;
//       const [shops, role] = data;

//       setShops(shops);
//       setIsShopOwner(role === 'R@7yU5vK*9#L^eP&1!sF8$2B0oQmWzD4xJ%pC3gN#6T$Y');
//       console.log(shops, role);
//     } catch (error) {
//       console.log(error, "this is the error");
//       window.alert(error.response?.data?.error || 'Failed to fetch shops');
//     }
//   };

//   useEffect(() => {
//     getShops();
//   }, []);

//   const handleYourProductsClick = () => {
//     navigate('/yourProducts');
//   };

//   const handlePincodeSearch = () => {
//     if (pincode.length === 6 && /^\d+$/.test(pincode)) {
//       getShops(pincode);
//     } else {
//       alert('Please enter a valid 6-digit pincode');
//     }
//   };

//   return (
//     <div>
//       <h1>Shops</h1>
//       <input
//         type="text"
//         placeholder="Enter Pincode"
//         value={pincode}
//         onChange={(e) => setPincode(e.target.value)}
//       />
//       <button onClick={handlePincodeSearch}>Search by Pincode</button>
//       {shops.length === 0 ? (
//         <p>No shops found</p>
//       ) : (
//         <ul>
//           {shops.map((shop, index) => (
//             <Link to={`/showProducts?shopName=${shop.shopName}`} key={index}>
//               <li>
//                 <h2>{shop.shopName}</h2>
//                 <p>Address: {shop.address}</p>
//                 <p>Pincode: {shop.pincode}</p>
//               </li>
//             </Link>
//           ))}
//         </ul>
//       )}
//       {isShopOwner && (
//         <button onClick={handleYourProductsClick}>Your Products</button>
//       )}
//     </div>
//   );
// };

// export default Home;














import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [shops, setShops] = useState([]);
  const [isShopOwner, setIsShopOwner] = useState(false);
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const observer = useRef();

  const getShops = async (pincode = '', page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:7000/shops', {
        headers: { Authorization: token },
        params: { pincode, page, limit: 10 },
      });

      const { shops: newShops, role, total } = response.data;

      setShops((prevShops) => [...prevShops, ...newShops]);
      setIsShopOwner(role === 'R@7yU5vK*9#L^eP&1!sF8$2B0oQmWzD4xJ%pC3gN#6T$Y');
      setHasMore(newShops.length > 0 && shops.length + newShops.length < total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.error || 'Failed to fetch shops');
    }
  };

  useEffect(() => {
    getShops(pincode, page);
  }, [page]);

  const handleYourProductsClick = () => {
    navigate('/yourProducts');
  };

  const handlePincodeSearch = () => {
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setShops([]);
      setPage(1);
      setHasMore(true);
      getShops(pincode, 1);
    } else {
      alert('Please enter a valid 6-digit pincode');
    }
  };

  const lastShopElementRef = useCallback((node) => {
    // console.log("node is this =>", node)
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      // console.log("enteries is this =>", entries);
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
        // console.log("page is this =>", page)
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);


  // const lastShopElementRef = useCallback((node) => {
  //   const lastShopElementRef: This declares a constant named lastShopElementRef.
  //   useCallback((node) => {: useCallback is a React hook that memoizes a function. This means the function is only recreated if one of its dependencies changes. It takes a function as an argument. The function itself takes a parameter node, which refers to the DOM element that this ref is attached to.
  //   if (loading) return;
  //   if (loading) return;: This checks if the loading state is true. If it is, the function returns immediately, doing nothing further. This prevents new observers from being set up while data is still being loaded.
  //   if (observer.current) observer.current.disconnect();
  //   if (observer.current): Checks if there's an existing observer stored in observer.current.
  //   observer.current.disconnect();: If there is an existing observer, it disconnects it. This ensures that there is only one observer active at a time, preventing multiple observers from being attached to different elements.
  //   observer.current = new IntersectionObserver((entries) => {
  //   observer.current = new IntersectionObserver((entries) => {: This creates a new IntersectionObserver instance and assigns it to observer.current. The IntersectionObserver takes a callback function that receives entries as its parameter. entries is an array of IntersectionObserverEntry objects.
  //   if (entries[0].isIntersecting && hasMore) {
  //   if (entries[0].isIntersecting && hasMore) {: This checks if the first entry in the entries array is intersecting (i.e., if it is in view) and if there are more items to load (hasMore is true).
  //   setPage((prevPage) => prevPage + 1);
  //   setPage((prevPage) => prevPage + 1);: If both conditions in the previous line are true, this increments the page state by 1. It uses the functional form of the state setter to ensure the update is based on the latest state.
  //   });
  //   });: Closes the callback function for the IntersectionObserver.
  //   if (node) observer.current.observe(node);
  //   if (node): Checks if the node parameter is not null. This ensures that the observer only tries to observe a valid DOM element.
  //   observer.current.observe(node);: If node is valid, the observer starts observing it. This sets up the observer to track when the node (i.e., the last shop element in the list) comes into view.
  //   }, [loading, hasMore]);
  //   }, [loading, hasMore]);: Closes the useCallback hook. The second argument [loading, hasMore] is the dependency array for useCallback. This means the function will only be recreated if either loading or hasMore changes. This helps optimize performance by not recreating the function unnecessarily.
  // Summary
  // The lastShopElementRef function sets up an IntersectionObserver to track the last shop element in the list. When this element comes into view, and if more shops are available (hasMore is true), it increments the page state to load more shops. This allows for infinite scrolling, loading more items as the user scrolls down.


  return (
    <div>
      <h1>Shops</h1>
      <input
        type="text"
        placeholder="Enter Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />
      <button onClick={handlePincodeSearch}>Search by Pincode</button>
      {error && <p>{error}</p>}
      <ul style={{ width: "300px" }}>
        {shops.map((shop, index) => (
          <>
          <Link to={`/showProducts?shopName=${shop.shopName}`} key={index} style={{ width: "300px" }}>
            <li ref={index === shops.length - 1 ? lastShopElementRef : null}>
              <h2>{shop.shopName}</h2>
              <p>Address: {shop.address}</p>
              <p>Pincode: {shop.pincode}</p>
              
            </li>
          </Link>
          <a
          href={`https://www.google.com/maps?q=${shop.location.latitude},${shop.location.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Google Maps
        </a>
        </>
        ))}
      </ul>
      {loading && <p>Loading more shops...</p>}
      {isShopOwner && (
        <button onClick={handleYourProductsClick}>Your Products</button>
      )}
    </div>
  );
};

export default Home;
