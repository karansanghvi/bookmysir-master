import React, { useState } from 'react';
import Modal from '../Modal'; // Import the modal component

const CourseContent = ({ courses, updateCourseDetails }) => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [details, setDetails] = useState({
        hours: '',
        requirements: '',
        instructor: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isViewing, setIsViewing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        standard: '',
        branch: '',
        board: ''
    });
    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = (course, isEdit) => {
        setSelectedCourse(course);
        setDetails({
            hours: course.hours || '',
            requirements: course.requirements || '',
            instructor: course.instructor || ''
        });
        setIsEditing(isEdit);
        setIsViewing(!isEdit);
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateCourseDetails(selectedCourse.name, details);
        setSelectedCourse(null);
        setIsEditing(false);
        setIsViewing(false);
        setShowModal(false);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    const filteredCourses = courses.filter(course => {
        return (
            (filters.standard === '' || course.standard === filters.standard) &&
            (filters.branch === '' || course.branch === filters.branch) &&
            (filters.board === '' || course.board === filters.board) &&
            (course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             course.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

    return (
        <div>
            <h1 className='text-4xl font-bold mb-4'>Course Content</h1>

            <div className="filters mb-4 flex justify-between">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <select name="standard" value={filters.standard} onChange={handleFilterChange} className='mr-4'>
                    <option value="">Standard</option>
                    <option value="9th Standard">9th Standard</option>
                    <option value="10th Standard">10th Standard</option>
                    <option value="11th Standard">11th Standard</option>
                    <option value="12th Standard">12th Standard</option>
                    <option value="None">None</option>
                </select>
                <select name="branch" value={filters.branch} onChange={handleFilterChange} className='mr-4'>
                    <option value="">Branch</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Electronics Engineering">Electronics Engineering</option>
                    <option value="Electronics & Telecommunication Engineering">Electronics & Telecommunication Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Production Engineering">Production Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Automobile Engineering">Automobile Engineering</option>
                    <option value="None">None</option>
                </select>
                <select name="board" value={filters.board} onChange={handleFilterChange}>
                    <option value="">Board</option>
                    <option value="ICSE Board">ICSE Board</option>
                    <option value="CBSE Board">CBSCE Board</option>
                    <option value="HSC Board">HSC Board</option>
                    <option value="SSC Board">SSC Board</option>
                    <option value="None">None</option>
                </select>
            </div>

            <ul>
                {filteredCourses.map((course, index) => (
                    <li key={index}>
                        <p><b>Course Name:</b> {course.name}</p>
                        <p><b>Course Description:</b> {course.description}</p>
                        <p><b>Standard:</b> {course.standard}</p>
                        <p><b>Branch:</b> {course.branch}</p>
                        <p><b>Board:</b> {course.board}</p>
                        <div className='flex justify-between mb-4'>
                            <button onClick={() => handleButtonClick(course, true)} className='admin_button'>Edit Course</button>
                            <button onClick={() => handleButtonClick(course, false)} className='admin_button'>View Course</button>
                        </div>
                        <hr />
                    </li>
                ))}
            </ul>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                {isEditing && selectedCourse && (
                    <div>
                        <h1 className='text-center text-xl font-semibold mb-2'>Edit Details for {selectedCourse.name}</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <h1>Hours:</h1>
                                <input
                                    type="text"
                                    name="hours"
                                    value={details.hours}
                                    onChange={handleInputChange}
                                    className='admin_input'
                                />
                            </div>
                            <div>
                                <h1>Requirements:</h1>
                                <input
                                    type="text"
                                    name="requirements"
                                    value={details.requirements}
                                    onChange={handleInputChange}
                                    className='admin_input'
                                />
                            </div>
                            <div>
                                <h1>Instructor Name:</h1>
                                <input
                                    type="text"
                                    name="instructor"
                                    value={details.instructor}
                                    onChange={handleInputChange}
                                    className='admin_input'
                                />
                            </div>
                            <div className='flex justify-between mt-4'>
                                <button type="submit" className='admin_button pl-4 pr-4'>Save</button>
                                <button type="button" onClick={() => setShowModal(false)} className='admin_button pl-4 pr-4'>Cancel</button>
                            </div>
                        </form>
                    </div>
                )}

                {isViewing && selectedCourse && (
                    <div>
                        <h1 className='text-center text-xl font-semibold mb-2'>Details for {selectedCourse.name}</h1>
                        <p><b>Hours:</b> {selectedCourse.hours}</p>
                        <p><b>Requirements:</b> {selectedCourse.requirements}</p>
                        <p><b>Instructor Name:</b> {selectedCourse.instructor}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default CourseContent;
