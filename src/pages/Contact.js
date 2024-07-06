import React, { useRef } from 'react';
import '../assets/styles/style.css';
import contact_img from '../assets/images/contact_us.png';
import { firestore } from '../firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import emailjs from 'emailjs-com'; 

function Contact() {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const contactRef = collection(firestore, "contactForm");

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();

    let contactData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
      timestamp: Timestamp.fromDate(new Date())
    };

    try {
      await addDoc(contactRef, contactData);

      await emailjs.send('service_ewp4lpr', 'template_itg5ewu', {
        from_name: contactData.name,
        reply_to: contactData.email,
        message: contactData.message
      }, 'GpzeSez42c4S4GfBo');

      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error submitting contact form or sending email:', error);
    }
  };

  return (
    <>
      <section className='mt-32 md:pl-32'>
        <h1 className='contact_us_title'><span className='about_text'>Contact</span> Us</h1>
        <div className='grid md:grid-cols-2 grid-cols-1'>
          <div>
            <img src={contact_img} alt="" className='image' />
          </div>
          <form onSubmit={handleContactFormSubmit}>
            <div className='md:mr-32 mr-4 md:ml-0 ml-4 rounded-xl shadow-xl'>
              <h1 className='text-center font-bold text-5xl mt-4'>Raise A Query</h1>
              <h1 className='mt-4 ml-8'>Enter Full Name:</h1>
              <input
                type="text"
                name="name"
                id=""
                className='ml-8 styledInput'
                placeholder='Name'
                ref={nameRef}
              />
              <h1 className='mt-4 ml-8'>Enter Email Address:</h1>
              <input
                type="text"
                name="email"
                id=""
                className='ml-8 styledInput'
                placeholder='Email Address'
                ref={emailRef}
              />
              <h1 className='mt-4 ml-8'>Enter Query:</h1>
              <textarea
                name="message"
                id="styledInputTextArea"
                className='ml-8'
                placeholder='Your Query...'
                ref={messageRef}
              ></textarea>
              <div className='container'>
                <button className='submit_button mt-4 mb-4 md:pl-52 pl-32 md:pr-52 pr-32 pt-2 pb-2'>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact;
