import React, { useState } from 'react';

const PersonalDetailsStep = ({ nextStep, handleChange, values }) => {
  const [phoneError, setPhoneError] = useState('');

  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression for validating phone number
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    handleChange('phoneNumber')(event);

    if (!validatePhoneNumber(value)) {
      setPhoneError('Invalid phone number. Please enter a 10-digit phone number.');
    } else {
      setPhoneError('');
    }
  };

  return (
    <div>
      <h1 className='personal_details_title'>Personal Details</h1>
      <form>
        <h1 className='mt-4'>Enter Full Name:</h1>
        <input 
          type="text" 
          name="name"
          value={values.name}
          onChange={handleChange('name')}
          className="styledInput"
          placeholder='Name'
          required
        />
        <h1 className='mt-4'>Enter Phone Number:</h1>
        <input 
          type="text" 
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handlePhoneNumberChange}
          className="styledInput"
          placeholder='Phone Number'
          required
        />
        {phoneError && <p className="error-message">{phoneError}</p>}
      </form>
      <br />
      <button 
        onClick={nextStep} 
        className='next_button ml-8 mt-4'
        disabled={phoneError !== ''}
      >
        Next
      </button>
    </div>
  );
};

export default PersonalDetailsStep;
