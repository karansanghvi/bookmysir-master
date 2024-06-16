// TypeStep.js
import React from 'react';
import '../../assets/styles/style.css';

const TypeStep = ({ nextStep, prevStep, handleChange, values }) => {
  const { typeOfTuition } = values; // Assuming 'typeOfTuition' is in your formData state

  return (
    <div>
      <h1 className='personal_details_title ml-8'>Type Of Tuition</h1>
      <form>
        <div className='role'>
          <select 
            name="typeOfTuition" 
            id="typeOfTuition" 
            className='dropdown'
            value={typeOfTuition} // Controlled component to reflect selected value
            onChange={handleChange('typeOfTuition')} // Update formData on change
          >
            <option value="">Select A Type</option>
            <option value="home">Home Tuitions</option>
            <option value="online">Online Tuitions</option>
          </select>
        </div>
      </form>
      <br />
      <div className='home_buttons'>
        <button onClick={prevStep} className='prev_button'>Back</button>
        <button onClick={nextStep} className='next_button_two'>Next</button>
      </div>
    </div>
  );
};

export default TypeStep;
