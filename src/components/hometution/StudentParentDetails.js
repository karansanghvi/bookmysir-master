import React from 'react';
import '../../assets/styles/style.css';

function StudentParentDetails({ nextStep, prevStep, handleChange, values }) {

  return (
    <div className=''>
      <h1 className='personal_details_title'>Student/Parent Details</h1>
      <h1 className='font-medium'>Select Class/Engineering:</h1>
      <select
        name="class"
        id="class"
        className='styledInput mb-6'
        value={values.class}
        onChange={handleChange('class')}
      >
        <option value="">Select Class</option>
        <option value="1">Class 1</option>
        <option value="2">Class 2</option>
        <option value="3">Class 3</option>
        <option value="4">Class 4</option>
        <option value="5">Class 5</option>
        <option value="6">Class 6</option>
        <option value="7">Class 7</option>
        <option value="8">Class 8</option>
        <option value="9">Class 9</option>  
        <option value="10">Class 10</option>
        <option value="11">Class 11</option>
        <option value="12">Class 12</option>
        <option value="diploma">Engineering Diploma</option>
        <option value="degree">Engineering Degree</option>
      </select>

      <div className='home_buttons'>
        <button onClick={prevStep} className='prev_button'>Back</button>
        <button onClick={nextStep} className='next_button_two'>Next</button>
      </div>
    </div>
  );
}

export default StudentParentDetails;
