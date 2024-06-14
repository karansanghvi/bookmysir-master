import React, { useState } from 'react';
import '../../assets/styles/style.css';

function StudentParentDetails() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedEngg, setSelectedEngg] = useState(''); 

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleEnggChange = (e) => {
    setSelectedEngg(e.target.value);
  };

  return (
    <div className='ml-8'>
      <h1 className='personal_details_title'>Student/Parent Details</h1>
      <h1 className='font-medium'>Select Class:</h1>
      <select
        name="class"
        id="class"
        className='styledInput mb-6'
        value={selectedClass}
        onChange={handleClassChange}
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
      </select>

      <h1 className='font-medium'>Select Engineering:</h1>
      <select
        name="engg"
        id="engg"
        className='styledInput'
        value={selectedEngg}
        onChange={handleEnggChange}
      >
        <option value="">Select Type</option>
        <option value="degree">Engineering Degree</option>
        <option value="diploma">Engineering Diploma</option>
      </select>
    </div>
  );
}

export default StudentParentDetails;
