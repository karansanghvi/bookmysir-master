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
        chapters: []
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
    const [newChapter, setNewChapter] = useState({ title: '', videos: [] });

    const handleButtonClick = (course, isEdit) => {
        setSelectedCourse(course);
        setDetails({
            bigDescription: course.bigDescription || '',
            instructorDescription: course.instructorDescription || '',
            requirements: course.requirements || '',
            instructor: course.instructor || '',
            chapters: course.chapters || []
        });
        setIsEditing(isEdit);
        setIsViewing(!isEdit);
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    const handleChapterChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'video') {
            setNewChapter(prev => ({
                ...prev,
                videos: [...prev.videos, { videoFile: files[0], videoUrl: '' }]
            }));
        } else {
            setNewChapter(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add or update course details in Firestore
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

    const handleChapterUpload = async () => {
        const uploadPromises = newChapter.videos.map(async video => {
            const storageRef = ref(storage, `videos/${video.videoFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, video.videoFile);

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        // Handle progress, if needed
                    },
                    (error) => {
                        console.error('Error uploading chapter video: ', error);
                        reject(error);
                    },
                    async () => {
                        try {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            video.videoUrl = downloadURL;
                            resolve();
                        } catch (error) {
                            console.error('Error getting download URL: ', error);
                            reject(error);
                        }
                    }
                );
            });
        });

        try {
            await Promise.all(uploadPromises);
            setNewChapter(prev => ({
                ...prev,
                videos: [...prev.videos]
            }));
            alert('Chapter videos uploaded successfully!');
        } catch (error) {
            console.error('Error uploading chapter videos: ', error);
        }
    };

    const addChapter = () => {
        if (newChapter.title && newChapter.videos.length > 0) {
            setDetails(prevDetails => ({
                ...prevDetails,
                chapters: [...prevDetails.chapters, newChapter]
            }));
            setNewChapter({ title: '', videos: [] });
        } else {
            alert('Please provide both title and at least one video for the chapter.');
        }
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
                                </div>
                            </div>
                            <div>
                            <h2>Chapters</h2>
                            {details.chapters && details.chapters.map((chapter, index) => (
                                <div key={index}>
                                    <h3>{chapter.title}</h3>
                                    {chapter.videos && chapter.videos.map((video, vIndex) => (
                                        <video key={vIndex} src={video.videoUrl} controls width="300"></video>
                                    ))}
                                </div>
                            ))}
                        </div>
                            <div>
                                <h2>Add New Chapter</h2>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Chapter Title"
                                    value={newChapter.title}
                                    onChange={handleChapterChange}
                                />
                                <input
                                    type="file"
                                    name="video"
                                    onChange={handleChapterChange}
                                    multiple // Allow multiple video selection
                                />
                                <button type="button" onClick={handleChapterUpload}>Upload Video(s)</button>
                                <button type="button" onClick={addChapter}>Add Chapter</button>
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                )}
                {isViewing && selectedCourse && (
                    <div>
                        <h1 className='text-center text-xl font-semibold mb-2'>View Details for {selectedCourse.name}</h1>
                        <div>
                            <h2>Description:</h2>
                            <p>{selectedCourse.bigDescription}</p>
                        </div>
                        <div>
                            <h2>Instructor Description:</h2>
                            <p>{selectedCourse.instructorDescription}</p>
                        </div>
                        <div>
                            <h2>Requirements:</h2>
                            <p>{selectedCourse.requirements}</p>
                        </div>
                        <div>
                            <h2>Chapters</h2>
                            {details.chapters && details.chapters.map((chapter, index) => (
                                <div key={index}>
                                    <h3>{chapter.title}</h3>
                                    {chapter.videos && chapter.videos.map((video, vIndex) => (
                                        <video key={vIndex} src={video.videoUrl} controls width="300"></video>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default CourseContent;
