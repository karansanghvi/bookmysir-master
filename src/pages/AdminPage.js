import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../assets/styles/admin.css';
import CourseAdminPanel from '../components/AdminPanel/CourseAdminPanel';
import CourseContent from '../components/AdminPanel/CourseContent'; 
import HomeTutionAdminPanel from '../components/AdminPanel/HomeTutionAdminPanel';
import UsersAdminPanel from '../components/AdminPanel/UsersAdminPanel';
import PurchasedCoursesAdminPanel from '../components/AdminPanel/PurchasedCoursesAdminPanel';

Modal.setAppElement('#root');

const AdminPage = ({ courses, setCourses }) => {
    const [activeTab, setActiveTab] = useState(1);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(true);
    const navigate = useNavigate();

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    const updateCourses = (updatedCourses) => {
        setCourses(updatedCourses);
    };

    const updateCourseDetails = (courseName, details) => {
        const updatedCourses = courses.map(course => 
            course.name === courseName ? { ...course, ...details } : course
        );
        setCourses(updatedCourses);
    };

    const handleLogin = () => {
        if (username === 'bookmysir' && password === 'admin') {
            setIsAuthenticated(true);
            setShowModal(false);
        } else {
            alert('Incorrect username or password');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUsername('');
        setPassword('');
        setShowModal(true);
        navigate('/');
    };

    return (
        <>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Admin Login"
                className="modal"
                overlayClassName="overlay"
            >
                <div className="modal-content">
                    <h2>Login As Admin</h2>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            </Modal>

            {isAuthenticated && (
                <div className='mt-10 pl-10'>
                    <div className='flex justify-between items-center mb-6'>
                        <div>
                            <h2 className='admin_title'>Welcome, {username}</h2>
                        </div>
                        <div>
                            <button className='logout-button' onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                    <div className='pr-32 flex'>
                        <div className="bg-gray-200 w-1/4">
                            <div className="p-4">
                                <ul>
                                    <li className={`cursor-pointer ${activeTab === 1 ? 'bg-gray-400' : 'bg-gray-200'} px-4 py-2 rounded mb-2`} onClick={() => handleTabClick(1)}>
                                        Courses
                                    </li>
                                    <li className={`cursor-pointer ${activeTab === 2 ? 'bg-gray-400' : 'bg-gray-200'} px-4 py-2 rounded mb-2`} onClick={() => handleTabClick(2)}>
                                        Course Content
                                    </li>
                                    <li className={`cursor-pointer ${activeTab === 3 ? 'bg-gray-400' : 'bg-gray-200'} px-4 py-2 rounded mb-2`} onClick={() => handleTabClick(3)}>
                                        Users 
                                    </li>
                                    <li className={`cursor-pointer ${activeTab === 4 ? 'bg-gray-400' : 'bg-gray-200'} px-4 py-2 rounded mb-2`} onClick={() => handleTabClick(4)}>
                                        Home Tution 
                                    </li>
                                    <li className={`cursor-pointer ${activeTab === 5 ? 'bg-gray-400' : 'bg-gray-200'} px-4 py-2 rounded mb-2`} onClick={() => handleTabClick(5)}>
                                        Purchased Courses
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex-1 p-4">
                            {activeTab === 1 && <CourseAdminPanel courses={courses} setCourses={setCourses} updateCourses={updateCourses} />}
                            {activeTab === 2 && <CourseContent courses={courses} updateCourseDetails={updateCourseDetails} />}
                            {activeTab === 3 && <UsersAdminPanel />}
                            {activeTab === 4 && <HomeTutionAdminPanel />}
                            {activeTab === 5 && <PurchasedCoursesAdminPanel/>}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminPage;
