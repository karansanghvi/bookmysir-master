import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../components/contexts/CartContext';
import '../assets/styles/style.css';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../firebase';

function ShoppingCart() {
  const { cart, removeFromCart, getTotalPrice } = useContext(CartContext);
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchPurchasedCourses(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchPurchasedCourses = async (uid) => {
    const coursesRef = collection(firestore, 'purchasedCourses');
    const q = query(coursesRef, where('userId', '==', uid));

    try {
      const querySnapshot = await getDocs(q);
      const purchasedCoursesData = querySnapshot.docs.map(doc => doc.data());
      setPurchasedCourses(purchasedCoursesData);
    } catch (e) {
      console.error('Error fetching purchased courses: ', e);
    }
  };

  // Filter out purchased courses from the cart
  const cartCourses = cart.filter(course => !purchasedCourses.find(purchasedCourse => purchasedCourse.name === course.name));

  return (
    <section className='mt-32 md:pl-32 md:pr-32 pl-4 pr-4'>
      <h1 className='condition_title'>Shopping <span className='condition'>Cart</span></h1>
      {cartCourses.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <table className='cart_table'>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartCourses.map((course, index) => (
                <tr key={index} className='cart_item'>
                  <td>{course.name}</td>
                  <td>₹{course.price}</td>
                  <td>
                    <button onClick={() => removeFromCart(course.name)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='mt-8'>
            <h2>Total:</h2>
            <h2 className='price'>₹{getTotalPrice()}</h2>
            <Link to="/studentdetails">
              <button type="submit" className='cart_checkout font-bold'>Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default ShoppingCart;
