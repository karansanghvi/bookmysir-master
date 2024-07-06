import React, { useState } from 'react';
import '../assets/styles/style.css';
import signup_img from '../assets/images/Mobile login-rafiki.png';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Signup({ setUserName }) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignupSubmitButton = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential) {
        localStorage.setItem('userName', name); // Store username in localStorage
        setUserName(name); // Set username in state

        alert("Account created!!");
        navigate('/profile', { state: { name, email, phoneNumber } }); // Navigate to profile with user data
      }
    } catch (error) {
      console.log("Error in signup:", error.message);
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
              <form>
                <div className='grid md:grid-cols-2 grid-cols-1'>
                  <div>
                    <h1 className='mt-4 ml-8'>Enter First Name:</h1>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='ml-8 styledInputSignup' 
                      placeholder='Name'
                      required
                    />
                  </div>
                  <div>
                    <h1 className='mt-4 ml-8'>Enter Last Name:</h1>
                    <input 
                      type="text" 
                      name="lastName" 
                      id="lastName" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className='ml-8 styledInputSignup' 
                      placeholder='Surname'
                      required
                    />
                  </div>
                </div>
                <h1 className='mt-4 ml-8'>Enter Phone Number:</h1>
                <input 
                  type="text" 
                  name="phoneNumber" 
                  id="phoneNumber" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className='ml-8 styledInput' 
                  placeholder='Phone Number'
                  required
                />
                <h1 className='mt-4 ml-8'>Enter Email Address:</h1>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='ml-8 styledInput' 
                  placeholder='Email Address'
                  required
                />
                <h1 className='mt-4 ml-8'>Enter Password:</h1>
                <input 
                  type="password" 
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='ml-8 styledInput'
                  placeholder='Password' 
                  required
                />
                <div className='container'>
                  <button 
                    type="submit" 
                    className='submit_button mt-4 md:pl-52 pl-32 md:pr-52 pr-32 pt-2 pb-2'
                    onClick={handleSignupSubmitButton}
                  >
                    Submit
                  </button>
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