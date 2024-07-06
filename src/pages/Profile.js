import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { firestore } from '../firebase'; // Adjust the path as per your project structure
import '../assets/styles/style.css';

function Profile() {
  const location = useLocation();
  const { state } = location;
  const [address, setAddress] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [schoolMarks, setSchoolMarks] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [collegeMarks, setCollegeMarks] = useState('');

  // Firestore collection reference
  const profileRef = firestore.collection('profiles');

  // Function to handle form submission
  const handleSave = async () => {
    try {
      // Construct data object to be saved
      const data = {
        name: state?.name || '',
        phoneNumber: state?.phoneNumber || '',
        email: state?.email || '',
        address,
        schoolName,
        schoolMarks,
        collegeName,
        collegeMarks,
      };

      // Save data to Firestore
      await profileRef.add(data);

      // Optionally, you can reset the form fields after successful submission
      setAddress('');
      setSchoolName('');
      setSchoolMarks('');
      setCollegeName('');
      setCollegeMarks('');

      // Provide feedback to the user (e.g., success message)
      alert('Profile data saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      // Handle error (e.g., show error message)
      alert('Failed to save profile data. Please try again later.');
    }
  };

  return (
    <div className='mt-32 md:pl-32 pl-10'>
      <h1 className='profile_title'>Profile</h1>
      <div className='grid md:grid-cols-2 grid-cols-1'>
        <div>
          <p>Name:</p>
          <input
            className='styledInput p-4 mb-2'
            autoFocus
            value={state && state.name}
            readOnly // Making it read-only since it's coming from state
          />
          <p>Phone Number:</p>
          <input
            className='styledInput p-4 mb-2'
            autoFocus
            value={state && state.phoneNumber}
            readOnly // Making it read-only since it's coming from state
          />
          <p>Email Address:</p>
          <input
            className='styledInput p-4'
            autoFocus
            value={state && state.email}
            readOnly // Making it read-only since it's coming from state
          />
          <p>Address:</p>
          <input 
            type="text" 
            className='styledInput' 
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <p>School Name:</p>
          <input 
            type="text"
            className="styledInput mb-2"
            placeholder='Name Of School'
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
          />
          <p>Marks In School (in %)</p>
          <input 
            type="text"
            className="styledInput mb-2"
            placeholder='Marks'
            value={schoolMarks}
            onChange={(e) => setSchoolMarks(e.target.value)}
          />
          <p>College Name:</p>
          <input 
            type="text"
            className="styledInput mb-2"
            placeholder='Name Of College'
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
          />
          <p>Marks In College (in %)</p>
          <input 
            type="text"
            className="styledInput mb-2"
            placeholder='Marks'
            value={collegeMarks}
            onChange={(e) => setCollegeMarks(e.target.value)}
          />
        </div>
      </div>
      <div className="button-container">
        <button type="button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default Profile;
