import { addDoc, collection } from 'firebase/firestore';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../firebase';
import { CartContext } from '../components/contexts/CartContext';

function StudentDetails() {
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [educationName, setEducationName] = useState('');
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const details = collection(firestore, "studentDetailsForDelivery");

  const handleStudentDetailForm = async (e) => {
    e.preventDefault();
    
    let data = {
      fullName: name,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      educationName: educationName,
      cartDetails: cart,
    };

    try {
      await addDoc(details, data);
    } catch (e) {
      console.log("Error in student details form: ", e);
    }
    
    // Save student details and cart to localStorage for retrieval in Checkout page
    localStorage.setItem('studentDetails', JSON.stringify(data));

    // Navigate to the checkout page
    navigate('/checkout');
  };

  return (
    <section className='mt-32 md:pl-32'>
      <h1 className='login_title'>Student <span className='about_text'>Details</span></h1>
      <div>
        <div className='grid md:grid-cols-2 grid-cols-1'>
          <div></div>
          <div className='md:mr-32 mr-4 md:ml-0 ml-4 rounded-lg shadow-lg'>
            <form onSubmit={handleStudentDetailForm}>
              <h1 className='mt-4 ml-8'>Enter Full Name:</h1>
              <input 
                type="text" 
                name="name" 
                required
                className='ml-8 styledInput' 
                placeholder='Full Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <h1 className='mt-4 ml-8'>Enter Email Address:</h1>
              <input 
                type="email"
                name="email"
                required
                className='ml-8 styledInput'
                placeholder='Email Address'
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
              <h1 className='mt-4 ml-8'>Enter Phone Number:</h1>
              <input 
                type="phone"
                name="phone"
                required
                className='ml-8 styledInput'
                placeholder='Phone Number'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <h1 className='mt-4 ml-8'>Enter School/College Name:</h1>
              <input 
                type="text"
                name="education"
                required
                className='ml-8 styledInput'
                placeholder='Name'
                value={educationName}
                onChange={(e) => setEducationName(e.target.value)}
              />
              <div className='container'>
                <button className='submit_button mt-4 md:pl-52 pl-32 md:pr-52 pr-32 pt-2 pb-2' type="submit">Submit</button>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudentDetails;
