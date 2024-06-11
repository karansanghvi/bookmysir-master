import React from 'react';

function StudentDetails() {
  return (
    <>
     <section className='mt-32 md:pl-32'>
        <h1 className='login_title'>Student <span className='about_text'>Details</span></h1>
        <div>
          <div className='grid md:grid-cols-2 grid-cols-1'>
            <div>
              
            </div>
            <div className='md:mr-32 mr-4 md:ml-0 ml-4 rounded-lg shadow-lg'>
              <form>
                <h1 className='mt-4 ml-8'>Enter Full Name:</h1>
                <input 
                  type="text" 
                  name="name" 
                  required
                  className='ml-8 styledInput' 
                  placeholder='Full Name'
                />
                <h1 className='mt-4 ml-8'>Enter Email Address:</h1>
                <input 
                  type="email"
                  name="email"
                  required
                  className='ml-8 styledInput'
                  placeholder='Email Address'
                />
                <h1 className='mt-4 ml-8'>Enter Phone Number:</h1>
                <input 
                  type="phone"
                  name="phone"
                  required
                  className='ml-8 styledInput'
                  placeholder='Phone Number'
                />
                <h1 className='mt-4 ml-8'>Enter School/College Name:</h1>
                <input 
                  type="text"
                  name="education"
                  required
                  className='ml-8 styledInput'
                  placeholder='Name'
                />
                <div className='container'>
                  <button className='submit_button mt-4 md:pl-52 pl-32 md:pr-52 pr-32 pt-2 pb-2' type="submit">Submit</button>
                </div>
                <br />
              </form>
            </div>
          </div>
        </div>
      </section> 
    </>
  )
}

export default StudentDetails
