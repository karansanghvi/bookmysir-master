import React, { useState } from 'react';

const AddCourseForm = ({ courses, setCourses }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        instructor: '',
        hours: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCourse = { ...formData, id: Date.now().toString() };
        setCourses([...courses, newCourse]);
        setFormData({
            name: '',
            description: '',
            instructor: '',
            hours: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Course Name" required />
            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Course Description" required />
            <input type="text" name="instructor" value={formData.instructor} onChange={handleChange} placeholder="Instructor" required />
            <input type="text" name="hours" value={formData.hours} onChange={handleChange} placeholder="Hours" required />
            <button type="submit">Add Course</button>
        </form>
    );
};

export default AddCourseForm;
