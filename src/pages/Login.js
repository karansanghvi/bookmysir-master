import React from 'react';
import '../assets/styles/style.css';
import login_img from '../assets/images/Login-rafiki.png';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <>
      <section className='mt-32 md:pl-32'>
      <h1 className='contact_us_title'>Welcome Back To <span className='about_text'>bookmysir</span></h1>
        <div>
          <div className='grid md:grid-cols-2 grid-cols-1'>
            <div>
              <img src={login_img} alt="" className='image' />
            </div>
            <div className='md:mr-32 mr-4 md:ml-0 ml-4 rounded-lg shadow-lg'>
              <h1 className='mt-4 ml-8'>Enter Full Name:</h1>
              <input
                type="text" 
                name=""
                id="" 
                className='ml-8 styledInput' 
                placeholder='Name'
              />
              <h1 className='mt-4 ml-8'>Enter Email Address:</h1>
              <input 
                type="text" 
                name="" 
                id="" 
                className='ml-8 styledInput' 
                placeholder='Email Address'
              />
              <h1 className='mt-4 ml-8'>Enter Password:</h1>
              <input 
                type="text"
                name=""
                id=""
                className='ml-8 styledInput'
                placeholder='Password'
              />
              <div className='container'>
                <button className='submit_button mt-4 md:pl-52 pl-32 md:pr-52 pr-32 pt-2 pb-2'>Login</button>
              </div>
              <h1 className='text-lg font-semibold text-center mt-4'>Don't have an account? <Link to="/signup">Signup</Link></h1>
            </div>
          </div>
        </div>

      </section> 
    </>
  )
}

export default Login
