// src/components/contexts/CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (course) => {
    setCart((prevCart) => [...prevCart, course]);
  };

  const removeFromCart = (courseName) => {
    setCart((prevCart) => prevCart.filter(course => course.name !== courseName));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, course) => total + course.price, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
