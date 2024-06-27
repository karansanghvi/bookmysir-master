import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../components/contexts/CartContext';
import '../assets/styles/style.css';
import '../assets/styles/courses.css';
import axios from 'axios';

function Checkout() {
  const { cart, getTotalPrice } = useContext(CartContext);

  const generateRazorpayOrder = async () => {
    try {
      const response = await axios.post('YOUR_FIREBASE_FUNCTION_URL', {
        amount: getTotalPrice(), // Pass total amount to Firebase Function
      });
      const { data } = response;
      
      const options = {
        key: 'rzp_test_gJkAnjADfg8Udi',
        amount: getTotalPrice() * 100,
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Course Purchase',
        order_id: data.id,
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error in generating Razorpay order:', error);
    }
  };

  // Retrieve student details from localStorage
  const studentDetails = JSON.parse(localStorage.getItem('studentDetails'));

  return (
    <section className='mt-32 md:pl-32 md:pr-32'>
      <h1 className='checkout_title md:pl-0 pl-4'>Checkout</h1>
      <div className='grid md:grid-cols-2 grid-cols-1 md:gap-80 md:pl-0 pl-4'>
        <div>
          <div className='mb-10'>
            <h2 className='small_title'>Billing Details</h2>
            <p><b>Name:</b> {studentDetails?.fullName}</p>
            <p><b>Email Address:</b> {studentDetails?.emailAddress}</p>
            <p><b>Phone Number:</b> {studentDetails?.phoneNumber}</p>
            <p><b>School/College Name:</b> {studentDetails?.educationName}</p>
          </div>

          <h2 className='small_title'>Order Details</h2>
          {cart.map((course, index) => (
            <div key={index} className='mb-4'>
              <h1 className='font-bold text-xl'>{course.name}</h1>
              <h1>₹{course.price}</h1>
            </div>
          ))}
        </div>
        <div>
          <h2 className='small_title'>Summary</h2>
          <div className='grid md:grid-cols-2 grid-cols-1 mb-4'>
            <div>
              <h2 className='font-medium'>Total:</h2>
            </div>
            <div>
              <h2 className='font-medium'>₹{getTotalPrice()}</h2>
            </div>
          </div>
          <p className='md:mr-28 mr-10 text-sm'>By completing your purchase you agree to the <Link to="/termsandconditions">Terms & Conditions</Link></p>
          <button type='button' className='checkout_button' onClick={generateRazorpayOrder}>Complete Checkout</button>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
