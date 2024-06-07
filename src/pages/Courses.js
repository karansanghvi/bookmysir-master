import React, { useState, useEffect } from 'react';
import Filter from '../components/courses/Filter';
import CourseList from '../components/courses/CourseList';
import '../assets/styles/courses.css';

function Courses({ courses }) {
  const [filters, setFilters] = useState({
    board: '',
    standard: '',
    branch: '',
  });

  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    // Initially set filteredCourses to all courses
    setFilteredCourses(courses);
  }, [courses]);

  const applyFilters = () => {
    // Filter courses based on selected filters
    const filtered = courses.filter((course) => {
      return (
        (filters.standard === '' || course.standard === filters.standard) &&
        (filters.board === '' || course.board === filters.board) &&
        (filters.branch === '' || course.branch === filters.branch)
      );
    });
    setFilteredCourses(filtered);
  };

  return (
    <section className='mt-32 md:pl-32'>
      <h1 className='courses_title'>Courses</h1>
      <div className="App">
        <div className="filter-column">
          <Filter
            filters={filters}
            setFilters={setFilters}
            applyFilters={applyFilters}
          />
        </div>
        <div className="courses-column">
          <CourseList filteredCourses={filteredCourses} />
        </div>
      </div>
    </section>
  );
}

export default Courses;
