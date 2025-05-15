// src/context/ProductContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

   // Change as needed

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add product
 const addProduct = async (product) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    if (!res.ok) throw new Error("Failed to submit");

    const data = await res.json();
    setProducts(prev => [...prev, data]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};


  
 const editProduct = async (id, updatedData) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) throw new Error('Failed to update');

    const updatedProduct = await res.json();
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? updatedProduct : p))
    );
    return { success: true };
  } catch (error) {
    console.error('Error updating product:', error);
    return { success: false };
  }
};


  // Delete product
 const deleteProduct = async (id) => {
  if (!window.confirm('Are you sure you want to delete this product?')) return;

  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error("Failed to delete");

    setProducts((prev) => prev.filter((p) => p.id !== id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false };
  }
};


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, loading, addProduct, editProduct, deleteProduct, fetchProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProductContext must be used inside ProductProvider');
  return context;
};
