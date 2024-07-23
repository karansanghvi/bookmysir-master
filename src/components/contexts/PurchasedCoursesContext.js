// src/components/contexts/PurchasedCoursesContext.js
import React, { createContext, useState, useContext } from 'react';

const PurchasedCoursesContext = createContext();

export const PurchasedCoursesProvider = ({ children }) => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  return (
    <PurchasedCoursesContext.Provider value={{ purchasedCourses, setPurchasedCourses }}>
      {children}
    </PurchasedCoursesContext.Provider>
  );
};

export const usePurchasedCourses = () => useContext(PurchasedCoursesContext);
