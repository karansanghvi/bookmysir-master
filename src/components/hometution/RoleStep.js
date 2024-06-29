import React from 'react';
import '../../assets/styles/style.css';

const RoleStep = ({ nextStep, prevStep, handleChange, values }) => {
  return (
    <div>
      <h1 className='personal_details_title '>Role</h1>
      <form>
        <div className='role'>
          <select 
            name="role" 
            id="role" 
            className='dropdown' 
            value={values.role} 
            onChange={handleChange('role')} 
          >
            <option value="">Select A Role</option>
            <option value="SP">Student/Parent</option>
            <option value="Teacher">Teacher</option>
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

export default RoleStep;
