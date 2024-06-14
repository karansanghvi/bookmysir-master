import React, { useState } from 'react';
import '../../assets/styles/style.css';

const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  return (
    <>
      <h1 className='personal_details_title ml-8'>Personal Details</h1>
      <form>
        <h1 className='mt-4 ml-8'>Enter Full Name:</h1>
        <input 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="ml-8 styledInput"
          placeholder='Name'
          required
        />
        <h1 className='mt-4 ml-8'>Enter Email Address:</h1>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="ml-8 styledInput"
          placeholder='Email'
        />
        <h1 className='mt-4 ml-8'>Enter Phone Number:</h1>
        <input 
          type="tel" 
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="ml-8 styledInput"
          placeholder='Phone Number'
          required
        />
      </form>
    </>
  );
};

export default PersonalDetails;
