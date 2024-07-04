import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import '../assets/styles/style.css';

function MyLearning() {
  const [courses, setCourses] = useState([]);
  const userId = localStorage.getItem('userID');

  useEffect(() => {
    const fetchCourses = async () => {
      if (userId) {
        const coursesRef = collection(firestore, 'purchasedCourses');
        const q = query(coursesRef, where('userId', '==', userId));

        try {
          const querySnapshot = await getDocs(q);
          const purchasedCourses = querySnapshot.docs.map(doc => doc.data());
          setCourses(purchasedCourses);
        } catch (e) {
          console.error('Error fetching courses: ', e);
        }
      }
    };

    fetchCourses();
  }, [userId]);

  if (!userId) {
    return <div className='mt-32'>Please log in to view your courses.</div>;
  }

  if (courses.length === 0) {
    return <div className='mt-32'>No courses purchased.</div>;
  }

  return (
    <div className='mt-32 md:pl-32 md:pr-32'>
      <h1 className='my_learning_title'>My <span className='learning'>Learning</span></h1>
      <div>
        {courses.map((course, index) => (
          <div key={index} className='course-item'>
            <h3 className='text-2xl font-bold'>{course.name}</h3>
            <Link to={`/course/${course.name}`}>
              Go To Course
            </Link>
            <hr
              className='mt-4 mb-4'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyLearning;
