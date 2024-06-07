import React, { useState } from 'react';
import '../assets/styles/admin.css';
import CourseAdminPanel from '../components/AdminPanel/CourseAdminPanel';
import CourseContent from '../components/AdminPanel/CourseContent'; // Import your CourseContent component

const AdminPage = ({ courses, setCourses }) => {

    const [activeTab, setActiveTab] = useState(1);

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

    return (
        <>
            <div className='mt-10 pl-32'>
                <h1 className='admin_title'>Admin Panel</h1>
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
                            </ul>
                        </div>
                    </div>
                    <div className="flex-1 p-4">
                        {
                            activeTab === 1 && <CourseAdminPanel courses={courses} setCourses={setCourses} updateCourses={updateCourses} />
                        }
                        {activeTab === 2 && <CourseContent courses={courses} updateCourseDetails={updateCourseDetails} />}
                        {activeTab === 3 && <h1>Tab 3 Content</h1>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminPage;
