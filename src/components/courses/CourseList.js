import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/courses.css';

const CourseList = ({ filteredCourses }) => {
  return (
    <div>
      {filteredCourses.map((course) => (
        <div key={course.id} className='course-item'>
          <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mt-4'>
            <div>
              <h3 className='text-2xl text-left font-bold'>{course.name}</h3>
            </div>
            <div>
              <Link to={`/course/${course.name}`}>
                <button className='mb-4'>View Course</button>
              </Link>
            </div>
          </div>
          <p className='text-justify'>{course.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default CourseList;
