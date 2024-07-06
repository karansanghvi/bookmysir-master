import React, { useState, useEffect } from 'react';
import '../assets/styles/style.css';

function CoursesCompleted() {
  const [completedCourses, setCompletedCourses] = useState([]);
  const userId = localStorage.getItem('userID');

  useEffect(() => {
    if (userId) {
      const storedCompletedCourses = JSON.parse(localStorage.getItem('completedCourses')) || [];
      setCompletedCourses(storedCompletedCourses);
    }
  }, [userId]);

  if (!userId) {
    return <div className='mt-32'>Please log in to view your completed courses.</div>;
  }

  return (
    <div className='mt-32 md:pl-32 md:pr-32 pl-4 pr-4'>
      <h1 className='my_learning_title'>Courses <span className='learning'>Completed</span></h1>
      {completedCourses.length > 0 ? (
        <ul>
          {completedCourses.map((course, index) => (
            <>
              <li key={index}>
                <h1 className='text-2xl font-bold'>{course.name}</h1>
                <a href={course.link} target='_blank' rel='noopener noreferrer'>Go To Course</a>
              </li>
              <hr className='mt-4 mb-4' />
            </>
          ))}
        </ul>
      ) : (
        <p>No courses completed yet.</p>
      )}
    </div>
  );
}

export default CoursesCompleted;
