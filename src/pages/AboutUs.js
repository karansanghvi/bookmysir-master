import React from 'react';
import '../assets/styles/style.css';
import aboutimg from '../assets/images/Online learning-cuate.png';

function AboutUs() {
  return (
    <>
      <section className='mt-32 md:pl-32'>
        <h1 className='about_us_text'><span className='about_text'>About</span> Us</h1>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-60'>
         
          <div>
            <p className='about_info md:mt-10'>
              At BMS, we believe in the power of personalized education to transform lives. Our mission is to provide high-quality home tuition services that inspire learning, boost confidence, and foster academic success. With experienced tutors, tailored learning plans, and a commitment to excellence, we're here to support students on their educational journey.
            </p>
          </div>
          <div>
            <img src={aboutimg} alt="" className='w-80 h-80' />
          </div>
        </div>
      </section> 
    </>
  )
}

export default AboutUs
