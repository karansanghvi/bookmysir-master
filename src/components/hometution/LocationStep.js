import React from 'react';
import '../../assets/styles/style.css';

const LocationStep = ({ nextStep, handleChange, values }) => {
  return (
    <div>
      <h1 className='personal_details_title ml-8'>Location</h1>
      <form>
        <h1 className='mt-4 ml-8'>Enter Address:</h1>
        <textarea 
          id="styledInputTextArea" 
          className='ml-8' 
          placeholder='Your Address'
          value={values.address || ''} 
          onChange={handleChange('address')}
        />
      </form>
      <br />
      {/* Call nextStep to move to next step */}
      <button onClick={nextStep} className='next_button ml-8 mt-4'>Submit</button>
    </div>
  );
};

export default LocationStep;
