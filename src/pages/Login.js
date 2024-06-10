import React, { useState } from 'react';
import '../assets/styles/style.css';
import login_img from '../assets/images/Login-rafiki.png';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'login'), {
        email: email,
        password: password,
      });
      console.log("Document successfully written!!");
      navigate('/');
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };
  

  return (
    <>
      <section className='mt-32 md:pl-32'>
      <h1 className='login_title'>Welcome Back To <span className='about_text'>bookmysir</span></h1>
        <div>
          <div className='grid md:grid-cols-2 grid-cols-1'>
            <div>
              <img src={login_img} alt="" className='image_login' />
            </div>
            <div className='md:mr-32 mr-4 md:ml-0 ml-4 rounded-lg shadow-lg'>
              <form onSubmit={handleLoginSubmit}>
                <h1 className='mt-4 ml-8'>Enter Email Address:</h1>
                <input 
                  type="email" 
                  name="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='ml-8 styledInput' 
                  placeholder='Email Address'
                />
                <h1 className='mt-4 ml-8'>Enter Password:</h1>
                <input 
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='ml-8 styledInput'
                  placeholder='Password'
                />
                <div className='container'>
                  <button className='submit_button mt-4 md:pl-52 pl-32 md:pr-52 pr-32 pt-2 pb-2'>Login</button>
                </div>
                <h1 className='text-lg font-semibold text-center mt-4'>Don't have an account? <Link to="/signup">Signup</Link></h1>
              </form>
            </div>
          </div>
        </div>

      </section> 
    </>
  )
}

export default Login
