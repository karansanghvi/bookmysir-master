import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../components/contexts/CartContext';
import '../assets/styles/style.css';
import '../assets/styles/courses.css';
import { firestore } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

function Checkout() {
  const { cart, getTotalPrice } = useContext(CartContext);
  const studentDetails = JSON.parse(localStorage.getItem('studentDetails'));
  const userId = localStorage.getItem('userID');

  const handlePayment = async () => {
    const options = {
      amount: getTotalPrice(),
      currency: 'INR',
      receipt: 'bookmysir',
      payment_capture: 1,
    };

    try {
      const response = await fetch('http://localhost:5000/razorpay/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      }).then((res) => res.json());

      const razorpayOptions = {
        key: 'rzp_test_O3D0Wxoued9YVG',
        amount: getTotalPrice() * 100,
        currency: 'INR',
        name: 'bookmysir',
        description: 'Payment for online course',
        order_id: response.id,
        handler: async function (response) {
          console.log(response);
          await savePurchasedCourses();
        },
        prefill: {
          name: studentDetails?.fullName || '',
          email: studentDetails?.emailAddress || '',
          contact: studentDetails?.phoneNumber || '',
        },
        notes: {
          address: 'Payment',
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp1 = new window.Razorpay(razorpayOptions);
      rzp1.open();
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const savePurchasedCourses = async () => {
    const purchasedCoursesRef = collection(firestore, 'purchasedCourses');

    try {
      for (const course of cart) {
        await addDoc(purchasedCoursesRef, {
          userId,
          name: course.name,
          link: `/course/${course.name}`,
          purchasedAt: new Date(),
          studentDetails: {
            fullName: studentDetails?.fullName || '',
            emailAddress: studentDetails?.emailAddress || '',
            phoneNumber: studentDetails?.phoneNumber || '',
            educationName: studentDetails?.educationName || '',
          },
          totalPrice: getTotalPrice(),
        });
      }
    } catch (error) {
      console.error('Error saving purchased courses: ', error);
    }
  };

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
          <button type='button' className='checkout_button' onClick={handlePayment}>Complete Checkout</button>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
