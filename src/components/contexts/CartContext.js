import React, { createContext, useState, useEffect } from 'react';
import { firestore } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    if (userID) {
      fetchCart(userID);
    }
  }, [userID]);

  const fetchCart = async (userID) => {
    const cartDoc = await getDoc(doc(firestore, 'carts', userID));
    if (cartDoc.exists()) {
      setCart(cartDoc.data().items);
    }
  };

  const saveCart = async (items) => {
    if (userID) {
      await setDoc(doc(firestore, 'carts', userID), { items });
    }
  };

  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const removeFromCart = (itemName) => {
    const updatedCart = cart.filter((item) => item.name !== itemName);
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
