import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Footer from './pages/Footer';
import HomeTution from './pages/HomeTution';
import AdminPage from './pages/AdminPage';
import CourseDetail from './pages/CourseDetail';
import { useEffect, useState } from 'react';
import ShoppingCart from './pages/ShoppingCart';
import { CartProvider } from './components/contexts/CartContext';
import MyLearning from './pages/MyLearning';
import CoursesCompleted from './pages/CoursesCompleted';
import Profile from './pages/Profile';
import StudentDetails from './pages/StudentDetails';
import Checkout from './pages/Checkout';

function App() {
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem('courses');
    return savedCourses ? JSON.parse(savedCourses) : [];
  });

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  const [userName, setUserName] = useState(() => {
    const storedUserName = localStorage.getItem('userName');
    return storedUserName ? storedUserName : null;
  });

  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin';

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <>
      {!isAdminRoute && <Navbar userName={userName} setUserName={setUserName} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="admin" element={<AdminPage courses={courses} setCourses={setCourses} />} />
        <Route path="courses" element={<Courses courses={courses} />} />
        <Route path="course/:name" element={<CourseDetail courses={courses} />} />
        <Route path="hometution" element={<HomeTution />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login setUserName={setUserName} />} />
        <Route path="signup" element={<Signup setUserName={setUserName} />} />
        <Route path="termsandconditions" element={<TermsAndConditions />} />
        <Route path="privacypolicy" element={<PrivacyPolicy />} />
        <Route path="cart" element={<ShoppingCart />} />
        <Route path="mylearning" element={<MyLearning />} />
        <Route path="coursescompleted" element={<CoursesCompleted />} />
        <Route path="profile" element={<Profile />} />
        <Route path="studentdetails" element={<StudentDetails />} />
        <Route path="checkout" element={<Checkout />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  );
}

export default AppWrapper;
