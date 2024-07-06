// Navbar.js
import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from '../assets/images/bookmysir_logo.png';
import '../assets/styles/style.css';
import UserDropdown from '../components/UserDropdown';

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchUserName = async () => {
      const userID = localStorage.getItem('userID');
      const storedUserName = localStorage.getItem('userName');

      if (userID && storedUserName) {
        setUserName(storedUserName);
      } else {
        setUserName(null);
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userID');
    setUserName(null);
    navigate('/login');
  };

  return (
    <>
      <nav className="bg-white border-gray-200 shadow-lg fixed w-full top-0 z-10">
        <div className="flex flex-wrap items-center justify-between p-4 ml-4 mr-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="md:h-20 h-10" alt="NFC Logo" />
          </a>
          
          {/* hamburger */}
          <button
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg hover:bg-backgroundColor focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-black dark:hover:bg-backgroundColor dark:focus:ring-black md:hidden"
            aria-controls="navbar-cta"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>

          {/* items for mobile view */}
          <div className={`items-center justify-between w-full md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-cta">
            <ul className="flex flex-col font-medium p-4 mt-4 border  rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white text-lg">
              <li>
                <Link to="/" className="navbartext"aria-current="page">Home</Link>
              </li>
              <li>
                <Link to="/aboutus" className="navbartext"aria-current="page">About Us</Link>
              </li>
              <li>
                <Link to="/courses" className="navbartext"aria-current="page">Courses</Link>
              </li>
              <li>
                <Link to="/hometution" className="navbartext"aria-current="page">Home Tutions</Link>
              </li>
              <li>
                <a href="/contact" className="navbartext">Contact Us</a>
              </li>
              <li>
                {userName ? (
                  <UserDropdown userName={userName} onLogout={handleLogout} />
                ) : (
                  <a href="/login" className="navbartext">Login</a>
                )}
              </li>
            </ul>
          </div>

          {/* items for desktop view */}
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
            <ul className="flex flex-col font-medium p-4 mt-4 border  rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white text-lg">
                <li>
                    <Link to="/" className="navbartext"aria-current="page">Home</Link>
                </li>
                <li>
                    <Link to="/aboutus" className="navbartext"aria-current="page">About Us</Link>
                </li>
                <li>
                    <Link to="/courses" className="navbartext"aria-current="page">Courses</Link>
                </li>
                <li>
                  <Link to="/hometution" className="navbartext"aria-current="page">Home Tutions</Link>
                </li>
                <li>
                    <a href="/contact" className="navbartext">Contact Us</a>
                </li>
              <li>
                {userName ? (
                  <UserDropdown userName={userName} onLogout={handleLogout} />
                ) : (
                  <a href="/login" className="text-black font-bold loginbutton">Login</a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
