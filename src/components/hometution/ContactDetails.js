import React from 'react';
import '../../assets/styles/style.css';

const ContactDetails = () => {
  return (
    <>
        <h1 className='personal_details_title ml-8'>Contact Details</h1>
        <>
            <h1 className='mt-4 ml-8'>Enter Phone Number:</h1>
                <input 
                    type="text" 
                    name="phone" 
                    id="" 
                    className='ml-8 styledInput' 
                    placeholder='Phone Number' 
                />
            <div className='grid md:grid-cols-2 grid-cols-1'>
                <div>
                    <h1 className='mt-4 ml-8'>Enter Email Address:</h1>
                    <input 
                        type="text" 
                        name="email" 
                        id="" 
                        className='ml-8 styledInput' 
                        placeholder='Email Address' 
                    />
                </div>
                <div>
                    <h1 className='ml-8 mt-4'>Enter Password:</h1>
                    <input 
                        type="text" 
                        name="" 
                        id="" 
                        className='ml-8 styledInput' 
                        placeholder='Password' 
                    />
                </div>
            </div>
            <h1 className='mt-4 ml-8'>Enter Your Address:</h1>
            <textarea 
                name="" 
                id="styledInputTextAreaTution"
                className='ml-8' 
                placeholder='Address'
            ></textarea>
            {/* <div className='container'>
              <button className='submit_button mt-4 mb-4 md:pl-52 pl-32 md:pr-52 pr-32 pt-2 pb-2'>Submit</button>
            </div> */}
          </>
    </>
  );
};

export default ContactDetails;
