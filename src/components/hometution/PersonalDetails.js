import React from 'react';
import '../../assets/styles/style.css';

const PersonalDetails = () => {
  return (
    <>
        <h1 className='personal_details_title ml-8'>Personal Details</h1>
        <>
            <div className='grid md:grid-cols-2 grid-cols-1'>
                <div>
                    <h1 className='mt-4 ml-8'>Enter Full Name:</h1>
                    <input 
                        type="text" 
                        name="name" 
                        id="" 
                        className='ml-8 styledInput' 
                        placeholder='Name' 
                    />
                </div>
                <div>
                    <h1 className='ml-8 mt-4'>Enter Age:</h1>
                    <input 
                        type="text" 
                        name="" 
                        id="" 
                        className='ml-8 styledInput' 
                        placeholder='Age' 
                    />
                </div>
            </div>
            <h1 className='mt-4 ml-8'>Select Gender:</h1>
             <select name="standard" className='dropdown ml-8'>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer Not Say">Prefer Not Say</option>
            </select>
            {/* <div className='container'>
              <button className='submit_button mt-4 mb-4 md:pl-52 pl-32 md:pr-52 pr-32 pt-2 pb-2'>Submit</button>
            </div> */}
          </>
    </>
  );
};

export default PersonalDetails;
