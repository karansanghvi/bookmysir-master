import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import '../assets/styles/style.css';
// import CourseDetail from '../pages/CourseDetail';

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
    <div className='mt-32'>
      <h1 className='profile_title'>My Learning</h1>
      <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
        {courses.map((course, index) => (
          <div key={index} className='course-item'>
            <h3 className='text-2xl font-bold'>{course.name}</h3>
            <Link to={`/course/${course.name}`}>
              View Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyLearning;
