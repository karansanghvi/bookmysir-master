import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';
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
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [accordionItems, setAccordionItems] = useState([]);

    useEffect(() => {
        const fetchAccordionItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'accordions'));
                const items = querySnapshot.docs.map(doc => doc.data());
                setAccordionItems(items);
            } catch (error) {
                console.error('Error fetching accordion items: ', error);
            }
        };

        fetchAccordionItems();
    }, []);

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

    const handleAccordionInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'content') {
            setContent(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateCourseDetails(selectedCourse.name, details);

        try {
            await addDoc(collection(firestore, 'accordions'), {
                title,
                content,
                courseName: selectedCourse.name
            });
            setTitle('');
            setContent('');
            alert('Accordion item added!');
        } catch (error) {
            console.error('Error adding document: ', error);
        }

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

            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Course Name</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Standard</th>
                        <th className="py-2 px-4 border-b">Branch</th>
                        <th className="py-2 px-4 border-b">Board</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCourses.map((course, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">{course.name}</td>
                            <td className="py-2 px-4 border-b">{course.description}</td>
                            <td className="py-2 px-4 border-b">{course.standard}</td>
                            <td className="py-2 px-4 border-b">{course.branch}</td>
                            <td className="py-2 px-4 border-b">{course.board}</td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => handleButtonClick(course, true)}>Edit</button>
                                <button onClick={() => handleButtonClick(course, false)}>View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
                            <div>
                                <h2>Add Accordion Item</h2>
                                <div>
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={handleAccordionInputChange}
                                    />
                                </div>
                                <div>
                                    <label>Content:</label>
                                    <textarea
                                        name="content"
                                        value={content}
                                        onChange={handleAccordionInputChange}
                                    ></textarea>
                                </div>
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
                        <div>
                            <h2>Accordion Items</h2>
                            {accordionItems
                                .filter(item => item.courseName === selectedCourse.name)
                                .map((item, index) => (
                                    <div key={index} className='accordion-item'>
                                        <h3>{item.title}</h3>
                                        <p>{item.content}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default CourseContent;
