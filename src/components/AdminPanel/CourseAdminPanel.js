import React, { useState } from 'react';
import '../../assets/styles/style.css';
import '../../assets/styles/admin.css';
import { v4 as uuidv4 } from 'uuid';

const AddCourseModal = ({ currentCourse, setCurrentCourse, handleSubmit, isEditing, onClose }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCourse({ ...currentCourse, [name]: value });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h1 className="text-4xl font-bold mb-4">{isEditing ? 'Edit Course' : 'Add New Course'}</h1>
        <form onSubmit={handleSubmit}>
          {isEditing && <input type="hidden" name="id" value={currentCourse.id} />}
          <h1>Enter Course Name:</h1>
          <input
            type="text"
            name="name"
            value={currentCourse.name}
            onChange={handleInputChange}
            placeholder="Course Name"
            className="mb-2 admin_input"
            required
          />
          <h1>Enter Course Description</h1>
          <input
            type="text"
            name="description"
            value={currentCourse.description}
            onChange={handleInputChange}
            placeholder="Course Description"
            className="mb-2 admin_input"
            required
          />
          <h1>Select Standard</h1>
          <select
            name="standard"
            id="standard"
            value={currentCourse.standard}
            onChange={handleInputChange}
            className='dropdown'
          >
            <option value="">Select Standard</option>
            <option value="9th Standard">9th Standard</option>
            <option value="10th Standard">10th Standard</option>
            <option value="11th Standard">11th Standard</option>
            <option value="12th Standard">12th Standard</option>
            <option value="None">None</option>
          </select>
          <h1>Select Board</h1>
          <select
            name="board"
            id="board"
            value={currentCourse.board}
            onChange={handleInputChange}
            className='dropdown'
          >
            <option value="">Select Board</option>
            <option value="ICSE Board">ICSE Board</option>
            <option value="CBSE Board">CBSE Board</option>
            <option value="HSC Board">HSC Board</option>
            <option value="SSC Board">SSC Board</option>
            <option value="None">None</option>
          </select>
          <h1>Select Branch</h1>
          <select
            name="branch"
            id="branch"
            value={currentCourse.branch}
            onChange={handleInputChange}
            className='dropdown'
          >
            <option value="">Select Engineering Branch</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Electronics Engineering">Electronics Engineering</option>
            <option value="Electronics & Telecommunication Engineering">Electronics & Telecommunication Engineering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Production Engineering">Production Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Automobile Engineering">Automobile Engineering</option>
            <option value="None">None</option>
          </select>
          {/* <h1>Upload Course Image</h1>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="mb-2"
          /> */}
          <div className="flex justify-between">
            <button type="submit" className='apply_button pl-4 pr-4'>{isEditing ? 'Save' : 'Add'}</button>
            <button onClick={onClose} className='apply_button pl-6 pr-6'>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ViewCoursesModal = ({ courses, handleEdit, handleDelete, onClose, handleFilterChange, filters }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h1 className="text-4xl font-bold mb-4">View Added Courses</h1>
        <div className="filters mb-4 flex justify-between">
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
                <option value="CBSE Board">CBSE Board</option>
                <option value="HSC Board">HSC Board</option>
                <option value="SSC Board">SSC Board</option>
                <option value="None">None</option>
            </select>
        </div>
        <hr />
        <ul className='mb-10'>
          {courses.map((course, index) => (
            <li key={index}>
              <p><b>Course Name:</b> {course.name}</p>
              <p><b>Course Description: </b>{course.description}</p>
              <p><b>Standard: </b>{course.standard}</p>
              <p><b>Board: </b>{course.board}</p>
              <p><b>Branch: </b>{course.branch}</p>
              {/* {course.image && (
                <div>
                  <img 
                    src={course.image instanceof Blob ? URL.createObjectURL(course.image) : course.image} 
                    alt={course.name} 
                    className='course-image' 
                  />
                </div>
              )} */}
              <div className='flex justify-between'>
                <button onClick={() => handleEdit(index)} className='apply_button pl-4 pr-4'>Edit</button>
                <button onClick={() => handleDelete(index)} className='apply_button pl-6 pr-6'>Delete</button>
              </div>
              <hr className='mt-4' />
            </li>
          ))}
        </ul>
        
        <button onClick={onClose} className='apply_button'>Go Back</button>
      </div>
    </div>
  );
};

const CourseAdminPanel = ({ courses, setCourses }) => {
  const [currentCourse, setCurrentCourse] = useState({
    id: '',
    name: '',
    description: '',
    standard: '',
    board: '',
    branch: '',
    image: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [filters, setFilters] = useState({
      standard: '',
      branch: '',
      board: ''
  });

  const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const filteredCourses = courses.filter(course => {
      return (
          (filters.standard === '' || course.standard === filters.standard) &&
          (filters.branch === '' || course.branch === filters.branch) &&
          (filters.board === '' || course.board === filters.board)
      );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedCourses = [...courses];
      updatedCourses[editIndex] = currentCourse;
      setCourses(updatedCourses);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setCourses([...courses, { ...currentCourse, id: uuidv4() }]);
    }
    setCurrentCourse({
      id: '',
      name: '',
      description: '',
      standard: '',
      board: '',
      branch: '',
      image: ''
    });
    setAddModalOpen(false);
  };

  const handleEdit = (index) => {
    setCurrentCourse(courses[index]);
    setIsEditing(true);
    setEditIndex(index);
    setAddModalOpen(true);
  };

  const handleDelete = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
  };

  return (
    <div>
      {!addModalOpen && !viewModalOpen && (
          <>
            <div className='grid grid-cols-2 gap-10'>
              <div>
                <button onClick={() => setAddModalOpen(true)} className='course_card text-center'>Add New Course</button>
              </div>
              <div>
                <button onClick={() => setViewModalOpen(true)} className='course_card'>View Added Courses</button>
              </div>
            </div>
          </>
        )}

      {addModalOpen && (
        <AddCourseModal
          currentCourse={currentCourse}
          setCurrentCourse={setCurrentCourse}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
          onClose={() => setAddModalOpen(false)}
        />
      )}

      {viewModalOpen && (
        <ViewCoursesModal
          courses={filteredCourses}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          onClose={() => setViewModalOpen(false)}
          handleFilterChange={handleFilterChange}
          filters={filters}
        />
      )}
    </div>
  );
};

export default CourseAdminPanel;
