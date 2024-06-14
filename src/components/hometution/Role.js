import React, { useContext } from 'react';
import '../../assets/styles/style.css';
import { StepperContext } from '../contexts/StepperContext';

function Role() {

    const { userData, setUserData } = useContext(StepperContext);

    const handleChange = (e) => {
        setUserData({
            ...userData, role: e.target.value
        });
    };
 
  return (
    <>
      <h1 className='personal_details_title ml-8'>Role</h1>
      <div className='role'>
        <select name="role" id="role" className='dropdown' onChange={handleChange}>
            <option value="">Select A Role</option>
            <option value="SP">Student/Parent</option>
            <option value="Teacher">Teacher</option>
        </select>
      </div>
    </>
  )
}

export default Role
