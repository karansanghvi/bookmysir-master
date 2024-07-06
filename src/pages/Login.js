import React, { useRef, useState, useContext } from 'react';
import '../assets/styles/style.css';
import login_img from '../assets/images/Login-rafiki.png';
import { Link, useNavigate } from 'react-router-dom';
import { firestore } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { CartContext } from '../components/contexts/CartContext';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [popup, setPopup] = useState(false);
  const ref = collection(firestore, "login");
  const navigate = useNavigate();
  const { fetchCart } = useContext(CartContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    const q = query(ref, where("email", "==", email));

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setPopup(true); // Email not found
      } else {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        if (password === userData.password) {
          localStorage.setItem('userID', userDoc.id); 
          localStorage.setItem('userName', userData.name);
          console.log("Login successful");
          await fetchCart(userDoc.id); // Fetch the user's cart data
          navigate('/');
        } else {
          setPopup(true);
        }
      }
    } catch (e) {
      console.log("Error with login database: ", e);
    }
  };

  return (
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
                required
                className='ml-8 styledInput' 
                placeholder='Email Address'
                ref={emailRef}
              />
              <h1 className='mt-4 ml-8'>Enter Password:</h1>
              <input 
                type="password"
                name="password"
                required
                className='ml-8 styledInput'
                placeholder='Password'
                ref={passwordRef}
              />
              <div className='container'>
                <button className='submit_button mt-4 md:pl-52 pl-32 md:pr-52 pr-32 pt-2 pb-2' type="submit">Login</button>
              </div>
              <h1 className='text-lg font-semibold text-center mt-4'>Don't have an account? <Link to="/signup">Signup</Link></h1>
            </form>
          </div>
        </div>
      </div>
      {popup && (
        <div className='popup'>
          <div className='popup_inner'>
            <h1>Incorrect email or password. Please try again.</h1>
            <button onClick={() => setPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </section> 
  );
}

export default Login;
