import React from 'react';
import '../assets/styles/style.css';
import book_lecture_img from '../assets/images/Lesson-pana.png';

function BookDemoLecture() {
  return (
    <>
      <section className='mt-32 md:pl-32'>
        <h1 className='demo_text'>Book Your <span className='about_text'>Demo</span> Lecture</h1>
        <p className='demo_description'>Kindly fill in your details to book your demo lecture. We will contact you soon</p>
        <div className='grid md:grid-cols-2 grid-cols-1'>
          <div>
            <img src={book_lecture_img} alt="" className='image' />
          </div>
          <div className='md:mr-32 mr-4 md:ml-0 ml-4 md:mt-20 md:mb-20 rounded-xl shadow-xl'>
            <h1 className='mt-4 ml-8'>Enter Full Name:</h1>
            <input 
              type="text" 
              name="" 
              id="" 
              className='ml-8 styledInput' 
              placeholder='Name'
            />
            <h1 className='mt-8 ml-8'>Enter Phone Number:</h1>
            <input 
              type="text" 
              name="" 
              id="" 
              className='ml-8 styledInput' 
              placeholder='Phone Number'
            />
            <div className='container'>
                <button className='submit_button mt-4 mb-4 md:pl-52 pl-32 md:pr-52 pr-32 pt-2 pb-2'>Submit</button>
            </div>
          </div>
        </div>
      </section> 
    </>
  )
}

export default BookDemoLecture
