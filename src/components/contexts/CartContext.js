// CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import { auth, firestore } from '../../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchCartItems(user.uid);
      } else {
        setUserId(null);
        setCart([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchCartItems = async (uid) => {
    const cartRef = collection(firestore, 'cartItems');
    const q = query(cartRef, where('userId', '==', uid));

    try {
      const querySnapshot = await getDocs(q);
      const cartItemsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCart(cartItemsData);
    } catch (e) {
      console.error('Error fetching cart items: ', e);
    }
  };

  const addToCart = async (course) => {
    if (userId) {
      const cartItem = { ...course, userId };
      try {
        const docRef = await addDoc(collection(firestore, 'cartItems'), cartItem);
        setCart([...cart, { id: docRef.id, ...cartItem }]);
      } catch (e) {
        console.error('Error adding item to cart: ', e);
      }
    } else {
      alert('Please log in to add items to the cart');
    }
  };

  const removeFromCart = async (courseName) => {
    if (userId) {
      const cartRef = collection(firestore, 'cartItems');
      const q = query(cartRef, where('userId', '==', userId), where('name', '==', courseName));
      try {
        const querySnapshot = await getDocs(q);
        const batch = firestore.batch();
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
        setCart(cart.filter(item => item.name !== courseName));
      } catch (e) {
        console.error('Error removing item from cart: ', e);
      }
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
