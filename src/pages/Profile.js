import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { firestore } from '../firebase'; // Import Firestore dependencies from your Firebase configuration
import { addDoc, collection } from 'firebase/firestore';
import '../assets/styles/style.css';

function Profile() {
  const location = useLocation();
  const { state } = location;
  const [address, setAddress] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [schoolMarks, setSchoolMarks] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [collegeMarks, setCollegeMarks] = useState('');

  const saveProfile = async () => {
    try {
      const profileData = {
        name: state && state.name,
        phoneNumber: state && state.phoneNumber,
        email: state && state.email,
        address: address,
        schoolName: schoolName,
        schoolMarks: schoolMarks,
        collegeName: collegeName,
        collegeMarks: collegeMarks
      };

      const docRef = await addDoc(collection(firestore, 'profilePage'), profileData);
      console.log('Document written with ID: ', docRef.id);
      // Optionally, you can add a success message or clear form fields after saving
    } catch (error) {
      console.error('Error adding document: ', error);
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
        <button type="button" onClick={saveProfile}>Save</button>
      </div>
    </div>
  );
}

export default Profile;
