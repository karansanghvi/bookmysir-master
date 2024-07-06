import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
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
    const [newChapter, setNewChapter] = useState({ title: '', videos: [], documents: [] });
    const [previewVideo, setPreviewVideo] = useState(null);

    const handlePreviewVideoChange = (e) => {
        setPreviewVideo(e.target.files[0]);
    };

    const handlePreviewVideoUpload = async () => {
        if (!previewVideo) {
            alert('Please select a preview video file to upload');
            return;
        }

        const storageRef = ref(storage, `videos/${previewVideo.name}`);
        const uploadTask = uploadBytesResumable(storageRef, previewVideo);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // handle process if needed
            },
            (error) => {
                console.log('Error uploading preview video: ', error);
            },
            async () => {
                try {
                    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    setDetails(prevDetails => ({ ...prevDetails, videoUrl: downloadUrl }));
                    alert('Preview Video Uploaded Successfully');
                } catch (error) {
                    console.error('Error getting download URL: ', error);
                }
            }
        );
    };

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
        } else if (name === 'document') {
            setNewChapter(prev => ({
                ...prev,
                documents: [...prev.documents, { documentFile: files[0], documentUrl: '' }]
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
        const videoUploadPromises = newChapter.videos.map(async video => {
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

        const documentUploadPromises = newChapter.documents.map(async document => {
            const storageRef = ref(storage, `documents/${document.documentFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, document.documentFile);

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        // Handle progress, if needed
                    },
                    (error) => {
                        console.error('Error uploading chapter document: ', error);
                        reject(error);
                    },
                    async () => {
                        try {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            document.documentUrl = downloadURL;
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
            await Promise.all([...videoUploadPromises, ...documentUploadPromises]);
            setDetails(prev => ({
                ...prev,
                chapters: [...prev.chapters, newChapter]
            }));
            setNewChapter({ title: '', videos: [], documents: [] });
            alert('Chapter videos and documents uploaded successfully!');
        } catch (error) {
            console.error('Error uploading chapter videos and documents: ', error);
        }
    };

    const addChapter = () => {
        if (newChapter.title && newChapter.videos.length > 0) {
            setDetails(prevDetails => ({
                ...prevDetails,
                chapters: [...prevDetails.chapters, newChapter]
            }));
            setNewChapter({ title: '', videos: [], documents: [] });
        } else {
            alert('Please provide both title and at least one video for the chapter.');
        }
    };

    const handleDeleteChapter = (chapterIndex) => {
        if (window.confirm('Are you sure you want to delete this chapter?')) {
            const updatedChapters = [...details.chapters];
            updatedChapters.splice(chapterIndex, 1);
            setDetails(prevDetails => ({
                ...prevDetails,
                chapters: updatedChapters
            }));
        }
    };

    const handleEditChapterName = (chapterIndex, newName) => {
        const updatedChapters = [...details.chapters];
        updatedChapters[chapterIndex].title = newName;
        setDetails(prevDetails => ({
            ...prevDetails,
            chapters: updatedChapters
        }));
    };

    const handleDeleteChapterVideo = (chapterIndex, videoIndex) => {
        const updatedChapters = [...details.chapters];
        updatedChapters[chapterIndex].videos.splice(videoIndex, 1);
        setDetails(prevDetails => ({
            ...prevDetails,
            chapters: updatedChapters
        }));
    };

    const handleDeleteChapterDocument = async (chapterIndex, documentIndex) => {
        const storageRef = ref(storage, details.chapters[chapterIndex].documents[documentIndex].documentUrl);
        try {
            await deleteObject(storageRef);
            const updatedChapters = [...details.chapters];
            updatedChapters[chapterIndex].documents.splice(documentIndex, 1);
            setDetails(prevDetails => ({
                ...prevDetails,
                chapters: updatedChapters
            }));
            alert('Document deleted successfully!');
        } catch (error) {
            console.error('Error deleting document: ', error);
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
                    <option value="Higher Education">Higher Education</option>
                </select>
                <select name="branch" value={filters.branch} onChange={handleFilterChange} className='mr-4'>
                    <option value="">Branch</option>
                    <option value="Science">Science</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Medical">Medical</option>
                </select>
                <select name="board" value={filters.board} onChange={handleFilterChange}>
                    <option value="">Board</option>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                    <option value="IB">IB</option>
                </select>
            </div>

            <table className="min-w-full bg-white">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="w-1/6 py-2 px-4 border-b">Course Name</th>
                        <th className="w-1/6 py-2 px-4 border-b">Description</th>
                        <th className="w-1/6 py-2 px-4 border-b">Standard</th>
                        <th className="w-1/6 py-2 px-4 border-b">Branch</th>
                        <th className="w-1/6 py-2 px-4 border-b">Board</th>
                        <th className="w-1/6 py-2 px-4 border-b">Actions</th>
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
                                <h2>Chapters</h2>
                                {details.chapters && details.chapters.map((chapter, index) => (
                                    <div key={index}>
                                        <div>
                                            <h3>Chapter {index + 1}</h3>
                                            <input
                                                type="text"
                                                value={chapter.title}
                                                onChange={(e) => handleEditChapterName(index, e.target.value)}
                                            />
                                            <button onClick={() => handleDeleteChapter(index)}>Delete Chapter</button>
                                            <div>
                                                {chapter.videos && chapter.videos.map((video, vIndex) => (
                                                    <div key={vIndex}>
                                                        <video src={video.videoUrl} controls width="300"></video>
                                                        <button onClick={() => handleDeleteChapterVideo(index, vIndex)}>Delete Video</button>
                                                    </div>
                                                ))}
                                            </div>
                                            <div>
                                                {chapter.documents && chapter.documents.map((document, dIndex) => (
                                                    <div key={dIndex}>
                                                        <a href={document.documentUrl} target="_blank" rel="noopener noreferrer">Document {dIndex + 1}</a>
                                                        <button onClick={() => handleDeleteChapterDocument(index, dIndex)}>Delete Document</button>
                                                    </div>
                                                ))}
                                            </div>
                                            <hr className="mb-4 mt-4" />
                                        </div>
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
                                <input
                                    type="file"
                                    name="document"
                                    onChange={handleChapterChange}
                                    multiple // Allow multiple document selection
                                />
                                <button type="button" onClick={handleChapterUpload}>Upload Video(s) & Document(s)</button>
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
                            {selectedCourse.videoUrl && (
                                <div>
                                    <h2>Course Preview Video:</h2>
                                    <video src={selectedCourse.videoUrl} controls className='w-200 h-80'></video>
                                </div>
                            )}
                        </div>
                        <div>
                            <h2>Chapters</h2>
                            {details.chapters && details.chapters.map((chapter, index) => (
                                <div key={index}>
                                    <h3>{chapter.title}</h3>
                                    {chapter.videos && chapter.videos.map((video, vIndex) => (
                                        <video key={vIndex} src={video.videoUrl} controls width="300"></video>
                                    ))}
                                    {chapter.documents && chapter.documents.map((document, dIndex) => (
                                        <a key={dIndex} href={document.documentUrl} target="_blank" rel="noopener noreferrer">Document {dIndex + 1}</a>
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
