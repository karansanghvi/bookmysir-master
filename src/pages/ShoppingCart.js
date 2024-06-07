import React, { useContext } from 'react';
import { CartContext } from '../components/contexts/CartContext';
import '../assets/styles/style.css';

function ShoppingCart() {
  const { cart, removeFromCart, getTotalPrice } = useContext(CartContext);

  return (
    <>
      <section className='mt-32 md:pl-32 md:pr-32'>
        <h1 className='condition_title'>Shopping <span className='condition'>Cart</span></h1>
        <hr />
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cart.map((course, index) => (
              <div key={index} className='cart_item'>
                <h2>{course.name}</h2>
                <p>Price: ₹{course.price}</p>
                <button onClick={() => removeFromCart(course.name)}>Remove</button>
              </div>
            ))}
            <h2>Total Price: ₹{getTotalPrice()}</h2>
          </div>
        )}
      </section>
    </>
  );
}

export default ShoppingCart;
