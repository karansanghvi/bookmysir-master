import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import '../assets/styles/style.css';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState({
    name: false,
    phoneNumber: false,
    email: false
  });
  const [address, setAddress] = useState('');
  const [school, setSchool] = useState({ name: '', marks: '' });
  const [college, setCollege] = useState({ name: '', marks: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userID');
      if (userId) {
        try {
          const userDoc = await getDoc(doc(firestore, "signup", userId));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
            setAddress(userDoc.data().address || '');
            setSchool({
              name: userDoc.data().schoolName || '',
              marks: userDoc.data().schoolMarks || ''
            });
            setCollege({
              name: userDoc.data().collegeName || '',
              marks: userDoc.data().collegeMarks || ''
            });
          } else {
            console.log("No such document!");
          }
        } catch (e) {
          console.error("Error fetching user data: ", e);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value
    });
  };

  const handleBlur = async (field) => {
    setIsEditing({
      ...isEditing,
      [field]: false
    });

    const userId = localStorage.getItem('userID');
    if (userId) {
      try {
        await updateDoc(doc(firestore, "signup", userId), {
          [field]: userData[field],
          address, // Include address in the update
          schoolName: school.name, // Include school name in the update
          schoolMarks: school.marks, // Include school marks in the update
          collegeName: college.name, // Include college name in the update
          collegeMarks: college.marks // Include college marks in the update
        });
        alert("Changes saved successfully!");
      } catch (e) {
        console.error("Error updating user data: ", e);
      }
    }
  };

  const handleEdit = (field) => {
    setIsEditing({
      ...isEditing,
      [field]: true
    });
  };

  const handleSave = async () => {
    const userId = localStorage.getItem('userID');
    if (userId) {
      try {
        await updateDoc(doc(firestore, "signup", userId), {
          ...userData,
          address,
          schoolName: school.name,
          schoolMarks: school.marks,
          collegeName: college.name,
          collegeMarks: college.marks
        });
        alert("Changes saved successfully!");
      } catch (e) {
        console.error("Error saving user data: ", e);
      }
    }
  };

  if (!userData) {
    return <div className='mt-32'>Loading...</div>;
  }

  return (
    <div className='mt-32 md:pl-32 pl-10'>
      <h1 className='profile_title'>Profile</h1>
      <div className='grid md:grid-cols-2 grid-cols-1'>
        <div>
          <p>Name:</p>
          {isEditing.name ? (
            <input
              className='styledInput p-4 mb-2'
              value={userData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              autoFocus
            />
          ) : (
            <p className='styledInput p-4 mb-2' onClick={() => handleEdit('name')}>{userData.name}</p>
          )}
          <p>Phone Number:</p>
          {isEditing.phoneNumber ? (
            <input
              className='styledInput p-4 mb-2'
              value={userData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              onBlur={() => handleBlur('phoneNumber')}
              autoFocus
            />
          ) : (
            <p className='styledInput p-4 mb-2' onClick={() => handleEdit('phoneNumber')}>{userData.phoneNumber}</p>
          )}
          <p>Email Address:</p>
          {isEditing.email ? (
            <input
              className='styledInput p-4'
              value={userData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              autoFocus
            />
          ) : (
            <p className='styledInput p-4' onClick={() => handleEdit('email')}>{userData.email}</p>
          )}
          <p>Address:</p>
          <input 
            type="text" 
            className='styledInput' 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <p>School Name:</p>
          <input 
            type="text"
            className="styledInput mb-2"
            value={school.name}
            onChange={(e) => setSchool({ ...school, name: e.target.value })}
            placeholder='Name Of School'
          />
          <p>Marks In School(in %)</p>
          <input 
            type="text"
            className="styledInput mb-2"
            value={school.marks}
            onChange={(e) => setSchool({ ...school, marks: e.target.value })}
            placeholder='Marks'
          />
          <p>College Name:</p>
          <input 
            type="text"
            className="styledInput mb-2"
            value={college.name}
            onChange={(e) => setCollege({ ...college, name: e.target.value })}
            placeholder='Name Of College'
          />
          <p>Marks In College(in %)</p>
          <input 
            type="text"
            className="styledInput mb-2"
            value={college.marks}
            onChange={(e) => setCollege({ ...college, marks: e.target.value })}
            placeholder='Marks'
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
