import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function UserDropdown({ userName, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button onClick={toggleDropdown} className="text-black font-bold loginbutton">
        {userName}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-lg">
          <Link to="/profile" className="block px-4 py-2 text-lg text-black font-medium">
            Profile
          </Link>
          <hr  className='ml-4 mr-4'/>
          <Link to="/cart" className="block px-4 py-2 text-lg text-black font-medium">
            Shopping Cart
          </Link>
          <hr  className='ml-4 mr-4'/>
          <Link to="/mylearning" className="block px-4 py-2 text-lg text-black font-medium">
            My Learning
          </Link>
          <hr  className='ml-4 mr-4'/>
          <Link to="/coursescompleted" className="block px-4 py-2 text-lg text-black font-medium">
            Courses Completed
          </Link>
          <hr  className='ml-4 mr-4'/>
          <button
            onClick={onLogout}
            className="block px-4 py-2 text-lg text-black font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
