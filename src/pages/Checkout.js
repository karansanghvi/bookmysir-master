import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../components/contexts/CartContext';
import WhatsApp from 'react-whatsapp'; // Import WhatsApp component
import '../assets/styles/style.css';
import '../assets/styles/courses.css';

function Checkout() {
  const { cart, getTotalPrice } = useContext(CartContext);
  const [showWhatsApp, setShowWhatsApp] = useState(false); // State to control WhatsApp component visibility

  // Retrieve student details from localStorage
  const studentDetails = JSON.parse(localStorage.getItem('studentDetails'));

  // State variables for message and formatted phone number
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  // Function to construct the WhatsApp message and format the phone number
  const sendWhatsAppMessage = () => {
    const messageContent = `Billing Details:
Name: ${studentDetails?.fullName}
Email: ${studentDetails?.emailAddress}
Phone: ${studentDetails?.phoneNumber}
Education: ${studentDetails?.educationName}

Order Details:
${cart.map((course, index) => (
  `${course.name} - ₹${course.price}`
)).join('\n')}

Total: ₹${getTotalPrice()}`;

    // Format the phone number according to WhatsApp API
    const formattedNumber = `91${studentDetails?.phoneNumber}`;

    // Set state variables
    setFormattedPhoneNumber(formattedNumber);
    setMessage(messageContent);

    // Show WhatsApp component
    setShowWhatsApp(true);
  };

  return (
    <section className='mt-32 md:pl-32 md:pr-32'>
      <h1 className='condition_title'>Checkout</h1>
      <div className='grid md:grid-cols-2 grid-cols-1 gap-80'>
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
          <p className='md:mr-28 text-sm'>By completing your purchase you agree to the <Link to="/termsandconditions">Terms & Conditions</Link></p>
          <button type='button' onClick={sendWhatsAppMessage} className='checkout_button'>Complete Checkout</button>
          {showWhatsApp && (
            <WhatsApp
              number={`+${formattedPhoneNumber}`} // Format number according to WhatsApp API
              message={message}
              element="a"
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Checkout;
