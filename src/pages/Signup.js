import React, { useState } from 'react';
import '../assets/styles/style.css';
import signup_img from '../assets/images/Mobile login-rafiki.png';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Signup() {

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "users"), formData);
      console.log("Document written with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <section className='mt-32 md:pl-32'>
        <h1 className='contact_us_title'>Create An <span className='about_text'>Account</span></h1>
        <div>
          <div className='grid md:grid-cols-2 grid-cols-1'>
            <div>
              <img src={signup_img} alt="" className='image' />
            </div>
            <div className='md:mr-32 mr-4 md:ml-0 ml-4 rounded-xl shadow-xl'>
              <form onSubmit={handleSubmit}>
                <h1 className='mt-4 ml-8'>Enter Full Name:</h1>
                <input 
                  type="text" 
                  name="fullName" 
                  id="fullName" 
                  className='ml-8 styledInput' 
                  placeholder='Name' 
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <h1 className='mt-4 ml-8'>Enter Phone Number:</h1>
                <input 
                  type="text" 
                  name="phoneNumber" 
                  id="phoneNumber" 
                  className='ml-8 styledInput' 
                  placeholder='Phone Number'
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <h1 className='mt-4 ml-8'>Enter Email Address:</h1>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  className='ml-8 styledInput' 
                  placeholder='Email Address'
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <h1 className='mt-4 ml-8'>Enter Password:</h1>
                <input 
                  type="password" 
                  name="password"
                  id="password"
                  className='ml-8 styledInput'
                  placeholder='Password' 
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className='container'>
                  <button type="submit" className='submit_button mt-4 md:pl-52 pl-32 md:pr-52 pr-32 pt-2 pb-2'>Submit</button>
                </div>
              </form>
              <h1 className='text-lg font-semibold text-center mt-4 mb-4'>Have an account? <Link to="/login">Login</Link></h1>
            </div>
          </div>
        </div>
      </section> 
    </>
  );
}

export default Signup;
