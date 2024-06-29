import React from 'react';
import '../../assets/styles/style.css';
import heroimg from '../../assets/images/Lesson-pana.png';
import { Link } from 'react-router-dom';

function HeroBanner() {
  return (
    <>
      <section className='hero-bg'>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-20 md:mt-4'>
          <div className='pt-36 md:pl-28 pl-10'>
            <h1 className='hero_text md:mb-0 mb-8'>
              <span className='text-[#EE4962]'>Guaranteed</span> Result Oriented Study Material & Methodology
            </h1>
            <Link to="/hometution" className='loginbutton font-bold md:p-6'>Book Demo Lecture</Link>
          </div>
          <div>
            <img src={heroimg} alt="" className='md:w-90 md:h-90 pr-8 md:pt-10' />
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroBanner
