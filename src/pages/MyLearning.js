import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function MyLearning() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userID');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesRef = collection(firestore, 'purchasedCourses');
        const q = query(coursesRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        const userCourses = querySnapshot.docs.map(doc => doc.data());
        setCourses(userCourses);
      } catch (error) {
        console.error('Error fetching courses: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [userId, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className='mt-32 md:pl-32 md:pr-32'>
      <h1 className='checkout_title md:pl-0 pl-4'>My Learning</h1>
      <div>
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={index} className='mb-4'>
              <h1 className='font-bold text-xl'>{course.name}</h1>
              <p>Purchased at: {course.purchasedAt.toDate().toLocaleDateString()}</p>
              <a href={course.link} className='text-blue-500'>Go to Course</a>
            </div>
          ))
        ) : (
          <p>No courses purchased yet.</p>
        )}
      </div>
    </section>
  );
}

export default MyLearning;
