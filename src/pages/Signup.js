import React, { useRef, useState } from 'react';
import '../assets/styles/style.css';
import signup_img from '../assets/images/Mobile login-rafiki.png';
import { Link, useNavigate } from 'react-router-dom';
import { firestore } from '../firebase';
import { addDoc, collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
// import bcrypt from 'bcryptjs'; 

function Signup() {
  const nameRef = useRef();
  const phoneNumberRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const signupRef = collection(firestore, "signup");
  const loginRef = collection(firestore, "login");
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  async function handleSignupSubmit(e) {
    e.preventDefault();

    let signupData = {
      name: nameRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    // Hashing the password using bcrypt
    // const hashedPassword = await bcrypt.hash(signupData.password, 10);
    // signupData.password = hashedPassword;

    const q = query(loginRef, where("email", "==", signupData.email));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setPopup(true);
      } else {
        const userDocRef = await addDoc(signupRef, signupData);
        await setDoc(doc(loginRef, userDocRef.id), signupData);
        console.log("Signup successful");
        localStorage.setItem('userID', userDocRef.id); 
        navigate('/');
      }
    } catch (e) {
      console.log("Error with signup database: ", e);
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
              <form onSubmit={handleSignupSubmit}>
                <h1 className='mt-4 ml-8'>Enter Full Name:</h1>
                <input 
                  type="text" 
                  name="fullName" 
                  id="fullName" 
                  className='ml-8 styledInput' 
                  placeholder='Name'
                  ref={nameRef} 
                  required
                />
                <h1 className='mt-4 ml-8'>Enter Phone Number:</h1>
                <input 
                  type="text" 
                  name="phoneNumber" 
                  id="phoneNumber" 
                  className='ml-8 styledInput' 
                  placeholder='Phone Number'
                  ref={phoneNumberRef}
                  required
                />
                <h1 className='mt-4 ml-8'>Enter Email Address:</h1>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  className='ml-8 styledInput' 
                  placeholder='Email Address'
                  ref={emailRef}
                  required
                />
                <h1 className='mt-4 ml-8'>Enter Password:</h1>
                <input 
                  type="password" 
                  name="password"
                  id="password"
                  className='ml-8 styledInput'
                  placeholder='Password' 
                  ref={passwordRef}
                  required
                />
                <div className='container'>
                  <button type="submit" className='submit_button mt-4 md:pl-52 pl-32 md:pr-52 pr-32 pt-2 pb-2'>Submit</button>
                </div>
              </form>
              <h1 className='text-lg font-semibold text-center mt-4 mb-4'>Have an account? <Link to="/login">Login</Link></h1>
            </div>
          </div>
        </div>
        {popup && (
          <div className='popup'>
            <div className='popup_inner'>
              <h1>Account already exists. Please log in.</h1>
              <button onClick={() => setPopup(false)} className="font-bold mt-2">Close</button>
            </div>
          </div>
        )}
      </section> 
    </>
  );
}

export default Signup;
