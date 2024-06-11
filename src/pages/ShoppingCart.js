import React, { useContext } from 'react';
import { CartContext } from '../components/contexts/CartContext';
import '../assets/styles/style.css';
import { Link } from 'react-router-dom';

function ShoppingCart() {
  const { cart, removeFromCart, getTotalPrice } = useContext(CartContext);

  return (
    <>
      <section className='mt-32 md:pl-32 md:pr-32'>
        <h1 className='condition_title'>Shopping <span className='condition'>Cart</span></h1>
        {cart.length === 0 ? (
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
                {cart.map((course, index) => (
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
    </>
  );
}

export default ShoppingCart;
