import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Owner = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    objectId: '',
    productImage: '',
    productName: '',
    description: '',
    colors: '',
    size: '',
    price: ''
  });

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:7000/products', {
        headers: { Authorization: token }
      });
      console.log(response);
      setProducts(response.data);
    } catch (error) {
      console.log(error.response?.data?.error || 'Product Fetching Failed');
    }
  };

  const deleteProduct = async (objectId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete('http://localhost:7000/delete', {
        headers: { Authorization: token },
        data: { productId: objectId } 
      });
      console.log(response.data.message);
      getProducts();
    } catch (error) {
      console.log(error.response?.data?.error || 'Failed to delete product');
    }
  };

  const updateProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:7000/update', {
        productId: form.objectId,
        productImage: form.productImage.split(',').map(item => item.trim()),
        productName: form.productName,
        description: form.description,
        colors: form.colors.split(',').map(color => color.trim()),
        size: form.size.split(',').map(s => s.trim()),
        price: form.price
      }, {
        headers: { Authorization: token }
      });
      console.log(response.data.message);
      setForm({
        objectId: '',
        productImage: '',
        productName: '',
        description: '',
        colors: '',
        size: '',
        price: ''
      });
      getProducts();
    } catch (error) {
      console.log(error.response?.data?.error || 'Failed to update product');
    }
  };

  const addProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:7000/addProduct', {
        productImage: form.productImage.split(',').map(item => item.trim()),
        productName: form.productName,
        description: form.description,
        colors: form.colors.split(',').map(color => color.trim()),
        size: form.size.split(',').map(s => s.trim()),
        price: form.price
      }, {
        headers: { Authorization: token }
      });
      console.log(response.data.message);
      setForm({
        objectId: '',
        productImage: '',
        productName: '',
        description: '',
        colors: '',
        size: '',
        price: ''
      });
      getProducts();
    } catch (error) {
      console.log(error.response?.data?.error || 'Failed to add product');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  return (
    <div>
      <h1>Owner</h1>
      {products.map((prod, index) => (
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
          <button onClick={() => deleteProduct(prod._id)}>Delete</button>
          <button onClick={() => setForm({ ...prod, objectId: prod._id, colors: prod.colors.join(', '), size: prod.size.join(', '), productImage: prod.productImage.join(', ') })}>Update</button>
        </div>
      ))}
      <button onClick={getProducts}>Get Data</button>
      <div>
        <h2>{form.objectId ? 'Update Product' : 'Add Product'}</h2>
        <input type="text" name="productName" value={form.productName} onChange={handleFormChange} placeholder="Product Name" />
        <input type="text" name="description" value={form.description} onChange={handleFormChange} placeholder="Description" />
        <input type="text" name="price" value={form.price} onChange={handleFormChange} placeholder="Price" />
        <input type="text" name="colors" value={form.colors} onChange={handleFormChange} placeholder="Colors (comma separated)" />
        <input type="text" name="size" value={form.size} onChange={handleFormChange} placeholder="Sizes (comma separated)" />
        <input type="text" name="productImage" value={form.productImage} onChange={handleFormChange} placeholder="Product Image URLs (comma separated)" />
        <button onClick={form.objectId ? updateProduct : addProduct}>{form.objectId ? 'Submit Update' : 'Add Product'}</button>
      </div>
    </div>
  );
};

export default Owner;
