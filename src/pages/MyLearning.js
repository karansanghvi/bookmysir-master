import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import '../assets/styles/style.css';
import no_course from '../assets/images/my_learning_no_course.png';

function MyLearning() {
  const [courses, setCourses] = useState([]);
  const userId = localStorage.getItem('userID');
  const navigate = useNavigate();

  const handleFindCourse = () => {
    navigate('/courses');
  };

  useEffect(() => {
    const fetchCourses = async () => {
      if (userId) {
        const coursesRef = collection(firestore, 'purchasedCourses');
        const q = query(coursesRef, where('userId', '==', userId));

        try {
          const querySnapshot = await getDocs(q);
          const purchasedCourses = querySnapshot.docs.map(doc => doc.data());

          const completedCourses = JSON.parse(localStorage.getItem('completedCourses')) || [];
          const completedCourseNames = completedCourses.map(course => course.name);

          const filteredCourses = purchasedCourses.filter(course => !completedCourseNames.includes(course.name));
          setCourses(filteredCourses);
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
    return <div className='mt-32 md:pl-0 pl-10 md:pr-0 pr-10'>
      <div className='flex items-center justify-center'>
        <img src={no_course} alt="" />
      </div>
      <h1 className='text-2xl font-bold text-center'>No Courses Purchased</h1>
      <p className='text-center'>Its a big lonely here, buy courses and start learning!</p>
      <div className='flex items-center justify-center'>
        <button className='my_learning_find' onClick={handleFindCourse}>
          <h1>Find Courses</h1>
        </button>
      </div>
    </div>;
  }

  return (
    <div className='mt-32 md:pl-32 md:pr-32 pl-4 pr-4'>
      <h1 className='my_learning_title'>My <span className='learning'>Learning</span></h1>
      <div>
        {courses.map((course, index) => (
          <div key={index} className='course-item'>
            <h3 className='text-2xl font-bold'>{course.name}</h3>
            <Link to={`/course/${course.name}`}>
              Go To Course
            </Link>
            <hr className='mt-4 mb-4' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyLearning;
