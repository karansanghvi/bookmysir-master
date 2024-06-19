// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { firestore } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    if (userID) {
      const fetchUser = async () => {
        const userDoc = await getDoc(doc(firestore, "login", userID));
        if (userDoc.exists()) {
          setCurrentUser(userDoc.data());
        }
      };
      fetchUser();
    }
  }, []);

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('userID');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
