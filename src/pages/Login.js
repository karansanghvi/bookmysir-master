import React, { useState, useEffect } from 'react';
import '../assets/styles/style.css';
import login_img from '../assets/images/Login-rafiki.png';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login({ setUserName }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmitButton = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('userName', user.displayName); // Store the display name
      localStorage.setItem('userID', user.uid); // Store the user ID
      setUserName(user.displayName);
      alert("User logged in!!");
      navigate('/');
    } catch (error) {
      console.error("Error logging in:", error.message);
      // Handle error here, such as displaying an error message to the user
    }
  }

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, [setUserName]);

  return (
    <section className='mt-32 md:pl-32'>
      <h1 className='login_title'>Welcome Back To <span className='about_text'>bookmysir</span></h1>
      <div>
        <div className='grid md:grid-cols-2 grid-cols-1'>
          <div>
            <img src={login_img} alt="" className='image_login' />
          </div>
          <div className='md:mr-32 mr-4 md:ml-0 ml-4 rounded-lg shadow-lg'>
            <form onSubmit={handleLoginSubmitButton}>
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
                <button 
                  className='submit_button mt-4 md:pl-52 pl-32 md:pr-52 pr-32 pt-2 pb-2' 
                  type="submit"
                >
                  Login
                </button>
              </div>
              <h1 className='text-lg font-semibold text-center mt-4'>Don't have an account? <Link to="/signup">Signup</Link></h1>
            </form>
          </div>
        </div>
      </div>
    </section> 
  );
}

export default Login;
