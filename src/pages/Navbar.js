import React, { useEffect, useContext } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from '../assets/images/bookmysir_logo.png';
import '../assets/styles/style.css';
import UserDropdown from '../components/UserDropdown';
import { auth } from '../firebase';
import { CartContext } from '../components/contexts/CartContext';

function Navbar() {
  // const [isMenuOpen, setMenuOpen] = React.useState(false);
  // const navigate = useNavigate();
  // const { clearCart } = useContext(CartContext);

  // useEffect(() => {
  //   const storedUserName = localStorage.getItem('userName');
  //   if (storedUserName) {
  //     setUserName(storedUserName);
  //   }
  // }, [setUserName]);

  // const toggleMenu = () => {
  //   setMenuOpen(!isMenuOpen);
  // };

  // const handleLogout = () => {
  //   auth.signOut()
  //     .then(() => {
  //       localStorage.removeItem('userID');
  //       localStorage.removeItem('userName');
  //       clearCart();
  //       setUserName(null);
  //       navigate('/login');
  //     })
  //     .catch((error) => {
  //       console.error('Error signing out: ', error);
  //     });
  // };
  const [userName, setUserName] = React.useState(null);
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserName(user.displayName); // Set username in state
        localStorage.setItem('userName', user.displayName); // Store username in localStorage
      } else {
        setUserName(null);
        localStorage.removeItem('userName'); // Remove username from localStorage
      }
    });

    return () => unsubscribe(); // Unsubscribe from the listener when component unmounts
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        localStorage.removeItem('userID');
        localStorage.removeItem('userName');
        clearCart();
        setUserName(null);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };
  
  

  return (
    <>
      <nav className="bg-white border-gray-200 shadow-lg fixed w-full top-0 z-10">
        <div className="flex flex-wrap items-center justify-between p-4 ml-4 mr-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="md:h-20 h-10" alt="NFC Logo" />
          </a>
          
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

          <div className={`items-center justify-between w-full md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-cta">
            <ul className="flex flex-col font-medium p-4 mt-4 border  rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white text-lg">
              <li>
                <Link to="/" className="navbartext" aria-current="page">Home</Link>
              </li>
              <li>
                <Link to="/aboutus" className="navbartext" aria-current="page">About Us</Link>
              </li>
              <li>
                <Link to="/courses" className="navbartext" aria-current="page">Courses</Link>
              </li>
              <li>
                <Link to="/hometution" className="navbartext" aria-current="page">Home Tutions</Link>
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

          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
            <ul className="flex flex-col font-medium p-4 mt-4 border  rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white text-lg">
              <li>
                <Link to="/" className="navbartext" aria-current="page">Home</Link>
              </li>
              <li>
                <Link to="/aboutus" className="navbartext" aria-current="page">About Us</Link>
              </li>
              <li>
                <Link to="/courses" className="navbartext" aria-current="page">Courses</Link>
              </li>
              <li>
                <Link to="/hometution" className="navbartext" aria-current="page">Home Tutions</Link>
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
