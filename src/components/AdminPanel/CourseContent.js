import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../firebase';
import Modal from '../Modal'; // Import the modal component

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
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [previewVideo, setPreviewVideo] = useState(null);
    const [accordionItems, setAccordionItems] = useState([]);
    const [file, setFile] = useState(null);
    const [accordionDetails, setAccordionDetails] = useState({
        title: '',
        content: '',
        videoUrls: []
    });

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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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

        if (file) {
            await handleVideoUpload();
        }

        updateCourseDetails(selectedCourse.name, details);

        // Update preview video URL if a new video is uploaded
        if (previewVideo) {
            await handlePreviewVideoUpload();
        }

        // Check if title or content is blank
        if (!title.trim() || !content.trim()) {
            // alert('Please enter both title and content for the accordion item.');
            return;
        }

        try {
            // Add or update accordion item in Firestore
            await addDoc(collection(firestore, 'accordions'), {
                title,
                content,
                courseName: selectedCourse.name,
                videoUrls: accordionDetails.videoUrls
            });
            setTitle('');
            setContent('');
            setAccordionDetails({
                title: '',
                content: '',
                videoUrls: []
            });
            alert('Accordion item added or updated!');
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


    const handleVideoUpload = async () => {
        if (!file) {
            alert('Please select a video file to upload.');
            return;
        }

        const storageRef = ref(storage, `videos/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Handle progress, if needed
            },
            (error) => {
                console.error('Error uploading video: ', error);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setDetails(prevDetails => ({ ...prevDetails, videoUrl: downloadURL }));
                    alert('Video uploaded successfully!');
                } catch (error) {
                    console.error('Error getting download URL: ', error);
                }
            }
        );
    };

    const handleAddVideoUrl = () => {
        if (details.videoUrl.trim() !== '') {
            if (!accordionDetails.videoUrls.includes(details.videoUrl)) {
                setAccordionDetails(prev => ({
                    ...prev,
                    videoUrls: [...prev.videoUrls, details.videoUrl]
                }));
            }
            setDetails(prev => ({ ...prev, videoUrl: '' }));
        }
    };

    const handleDeleteVideoUrl = (urlToDelete) => {
        setAccordionDetails(prev => ({
            ...prev,
            videoUrls: prev.videoUrls.filter(url => url !== urlToDelete)
        }));
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
                                    <div>
                                        <button type="button" onClick={handlePreviewVideoUpload} className='admin_button pl-4 pr-4 mt-2'>Upload Preview Video</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h1>Upload Video:</h1>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={handleFileChange}
                                        className='admin_input'
                                    />
                                </div>
                                <div>
                                    <button type="button" onClick={handleVideoUpload} className='admin_button pl-4 pr-4 mt-2'>Upload Video</button>
                                </div>
                            </div>
                            <div>
                                <h2>Course Content:</h2>
                                <div>
                                    <div>
                                        <label>Title:</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={title}
                                            onChange={handleAccordionInputChange}
                                            className='admin_input'
                                        />
                                    </div>
                                    <div>
                                        <label>Content:</label>
                                        <input 
                                            type="text"
                                            value={content}
                                            name="content"
                                            onChange={handleAccordionInputChange}
                                            className='admin_input'
                                        />
                                    </div>
                                </div>
                                <button type="button" onClick={handleAddVideoUrl}>Add Video URL</button>
                                {accordionDetails.videoUrls.map((url, index) => (
                                    <div key={index}>
                                        <p>
                                            <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                                            <button type="button" onClick={() => handleDeleteVideoUrl(url)}>Delete</button>
                                        </p>
                                    </div>
                                ))}
                            </div>
                            
                            <div className='grid grid-cols-2 gap-10'>
                                <button type="submit" className='admin_button'>Save</button>
                                <button type="button" onClick={() => setShowModal(false)} className='admin_button'>Cancel</button>
                            </div>
                        </form>
                    </div>
                )}

                {isViewing && selectedCourse && (
                    <div>
                        <h1 className='text-center text-xl font-semibold mb-2'>Details for {selectedCourse.name}</h1>
                        <div>
                            <div>
                                <h2>Requirements:</h2>
                                <p>{selectedCourse.requirements}</p>
                            </div>
                            <div>
                                <h2>Description:</h2>
                                <p>{selectedCourse.bigDescription}</p>
                            </div>
                        </div>
                        <br />
                        <div>
                            {selectedCourse.videoUrl && (
                                <div>
                                    <h2>Course Preview Video:</h2>
                                    <video src={selectedCourse.videoUrl} controls className='w-200 h-80'></video>
                                </div>
                            )}
                        </div>
                        <div>
                            <h2>Course Content Items: </h2>
                            {accordionItems
                                .filter(item => item.courseName === selectedCourse.name)
                                .map((item, index) => (
                                    <div key={index} className='accordion-item'>
                                        <h3><b>{item.title}</b></h3>
                                        <p>{item.content}</p>
                                        {item.videoUrls && item.videoUrls.length > 0 && (
                                            <div>
                                                <h4>Video URLs:</h4>
                                                <ul>
                                                    {item.videoUrls.map((url, idx) => (
                                                        <li key={idx}>
                                                            <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <h2>Instructor Details:</h2>
                            <p><b>Name:</b> {selectedCourse.instructor}</p>
                            <p><b>Description:</b> {selectedCourse.instructorDescription}</p>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default CourseContent;
