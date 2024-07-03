import React from 'react';

function CoursesCompleted() {
  const completedCourses = JSON.parse(localStorage.getItem('completedCourses')) || [];

  return (
    <div className='mt-32'>
      <h1>Courses Completed</h1>
      <ul>
        {completedCourses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </div>
  );
}

export default CoursesCompleted;
