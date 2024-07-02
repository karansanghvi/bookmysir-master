import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import Modal from '../Modal'; 

const CourseContent = ({ courses, updateCourseDetails }) => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [details, setDetails] = useState({
        requirements: '',
        bigDescription: '',
        instructor: '',
        instructorDescription: '',
        videoUrl: ''
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
    const [previewVideo, setPreviewVideo] = useState(null);

    const handleButtonClick = (course, isEdit) => {
        setSelectedCourse(course);
        setDetails({
            bigDescription: course.bigDescription || '',
            instructorDescription: course.instructorDescription || '',
            requirements: course.requirements || '',
            instructor: course.instructor || '',
            videoUrl: course.videoUrl || ''
        });
        setIsEditing(isEdit);
        setIsViewing(!isEdit);
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    const handlePreviewVideoChange = (e) => {
        setPreviewVideo(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Update preview video URL if a new video is uploaded
        if (previewVideo) {
            await handlePreviewVideoUpload();
        }

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

    const handlePreviewVideoUpload = async () => {
        if (!previewVideo) {
            alert('Please select a preview video file to upload.');
            return;
        }

        const storageRef = ref(storage, `videos/${previewVideo.name}`);
        const uploadTask = uploadBytesResumable(storageRef, previewVideo);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Handle progress, if needed
            },
            (error) => {
                console.error('Error uploading preview video: ', error);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setDetails(prevDetails => ({ ...prevDetails, videoUrl: downloadURL }));
                    alert('Preview Video uploaded successfully!');
                } catch (error) {
                    console.error('Error getting download URL: ', error);
                }
            }
        );
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
                                <div>
                                    <div>
                                        <h1>Requirements:</h1>
                                        <textarea 
                                            name="requirements" 
                                            id="styledInputTextArea"
                                            value={details.requirements}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <h1>Description:</h1>
                                        <textarea 
                                            name="bigDescription"
                                            value={details.bigDescription}
                                            onChange={handleInputChange} 
                                            id="styledInputTextArea"
                                        ></textarea>
                                    </div>
                                </div>
                                <div>
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
                                        <h1>Instructor Description:</h1>
                                        <input 
                                            type="text"
                                            name='instructorDescription'
                                            value={details.instructorDescription}
                                            onChange={handleInputChange}
                                            className='admin_input'
                                        />
                                    </div>
                                    <div>
                                        <h1>Upload Preview Video:</h1>
                                        <input
                                            type="file"
                                            accept="video/*"
                                            onChange={handlePreviewVideoChange}
                                            className='admin_input'
                                        />
                                    </div>
                                </div>
                                <div className='mt-4 flex justify-between'>
                                    <button
                                        type="submit"
                                        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded'
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {isViewing && selectedCourse && (
                    <div>
                        <h1 className='text-center text-xl font-semibold mb-2'>Details for {selectedCourse.name}</h1>
                        <div>
                            <div>
                                <div>
                                    <h1>Requirements:</h1>
                                    <textarea 
                                        name="requirements" 
                                        id="styledInputTextArea"
                                        value={details.requirements}
                                        readOnly
                                    ></textarea>
                                </div>
                                <div>
                                    <h1>Description:</h1>
                                    <textarea 
                                        name="bigDescription"
                                        value={details.bigDescription}
                                        readOnly
                                        id="styledInputTextArea"
                                    ></textarea>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h1>Instructor Name:</h1>
                                    <input
                                        type="text"
                                        name="instructor"
                                        value={details.instructor}
                                        readOnly
                                        className='admin_input'
                                    />
                                </div>
                                <div>
                                    <h1>Instructor Description:</h1>
                                    <input 
                                        type="text"
                                        name='instructorDescription'
                                        value={details.instructorDescription}
                                        readOnly
                                        className='admin_input'
                                    />
                                </div>
                                <div>
                                    <h1>Preview Video:</h1>
                                    {details.videoUrl && (
                                        <video controls className='w-full h-auto'>
                                            <source src={details.videoUrl} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>
                            </div>
                            <div className='mt-4 flex justify-between'>
                                <button
                                    type="button"
                                    className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded'
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default CourseContent;
