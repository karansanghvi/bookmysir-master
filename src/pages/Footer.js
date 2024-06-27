import React from 'react';
import '../assets/styles/style.css';
import { Link } from "react-router-dom";
import 'remixicon/fonts/remixicon.css';

function Footer() {

  const emailAddress = "bookmysir@gmail.com";
  const phoneNumber = "+91-88500839932"

  return (
    <>
      <section className='footer mt-20'>
        <h1 className='logo_name'>bookmysir</h1>
        <div className='footer_nav md:ml-0 ml-10'>
            <Link to="/" className='link'>Home</Link>
            <Link to="/aboutus" className='link'>About Us</Link>
            {/* <Link to="/courses" className='link'>Courses</Link> */}
            <Link to="/hometution" className='link'>Home Tutions</Link>
            {/* <Link to="/contactus" className='link'>Contact Us</Link> */}
        </div>
        <div className='footer_nav mb-8 md:ml-0 ml-10'>
            {/* <Link to="/termsandconditions" className='link'>Terms & Conditions</Link>
            <Link to="privacypolicy" className='link'>Privacy Policy</Link> */}
        </div>
        <div className='footer_nav_contact md:ml-0 ml-10'>
          <i className="ri-mail-fill" style={{ fontSize: '20px', marginRight: '10px' }}></i>
          <Link to={`mailto:${emailAddress}`} style={{fontSize: '20px', fontWeight: '500'}}>info@bookmysir.com</Link>
          <i className="ri-phone-fill md:ml-40 ml-0" style={{ fontSize: '20px' }}></i>
          <Link to={`tel:${phoneNumber}`} style={{fontSize: '20px', fontWeight: '500'}}>+91-88500839932</Link>
        </div>
        <div className="h-px bg-black md:ml-32 md:mr-32 mt-10"></div>
        <div className='footer_nav_copyright mt-4'>
          <i class="ri-copyright-line" style={{ fontSize: '20px', marginRight: '10px' }}></i>
          <h1 className='text-xl'>2024 All Rights Reserved | BMS</h1>
        </div>
      </section>
    </>
  )
}

export default Footer
