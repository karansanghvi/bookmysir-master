import React from 'react';
import '../../assets/styles/style.css';

const PersonalDetailsStep = ({ nextStep, handleChange, values }) => {
  return (
    <div>
      <h1 className='personal_details_title ml-8'>Personal Details</h1>
      <form>
        <h1 className='mt-4 ml-8'>Enter Full Name:</h1>
        <input 
          type="text" 
          name="name"
          value={values.name}
          onChange={handleChange('name')}
          className="ml-8 styledInput"
          placeholder='Name'
          required
        />
        <h1 className='mt-4 ml-8'>Enter Email Address:</h1>
        <input 
          type="email" 
          name="email"
          value={values.email}
          onChange={handleChange('email')}
          className="ml-8 styledInput"
          placeholder='Email'
        />
        <h1 className='mt-4 ml-8'>Enter Phone Number:</h1>
        <input 
          type="tel" 
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange('phoneNumber')}
          className="ml-8 styledInput"
          placeholder='Phone Number'
          required
        />
      </form>
      <br />
      <button onClick={nextStep} className='next_button ml-8 mt-4'>Next</button>
    </div>
  );
};

export default PersonalDetailsStep;
