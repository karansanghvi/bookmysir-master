import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { CartContext } from '../components/contexts/CartContext';
import video from '../assets/images/ph_video.png';
import downloadable_resources from '../assets/images/ic_baseline-download.png';
import mobile from '../assets/images/uiw_mobile.png';
import '../assets/styles/courses.css';
import { firestore } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const CourseDetail = ({ courses }) => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const course = courses.find((course) => course.name === name);
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = localStorage.getItem('userID');
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      if (isLoggedIn) {
        const coursesRef = collection(firestore, 'purchasedCourses');
        const q = query(coursesRef, where('userId', '==', isLoggedIn));

        try {
          const querySnapshot = await getDocs(q);
          const purchasedCourses = querySnapshot.docs.map(doc => doc.data());
          const purchasedCourseNames = purchasedCourses.map(course => course.name);
          setIsPurchased(purchasedCourseNames.includes(name));
        } catch (e) {
          console.error('Error fetching purchased courses: ', e);
        }
      }
    };

    fetchPurchasedCourses();
  }, [isLoggedIn, name]);

  if (!course) {
    return <div className='mt-32'>Course not found</div>;
  }

  const handleAddToCart = () => {
    if (isLoggedIn) {
      addToCart({ ...course, price: 500 });
      navigate('/cart');
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <section className='mt-32'>
        <div className='course_hero'>
          <div className='md:pl-32 pt-8'>
            <div className='grid md:grid-cols-2 grid-cols-1'>
              <div>
                <h1 className='md:text-6xl font-bold mb-4 md:mr-0 mr-120 text-4xl'>{course.name}</h1>
                <p className='mb-4'>{course.description}</p>
              </div>
              <div className='course_card'>
                <ReactPlayer
                  url={course.videoUrl}
                  width='100%'
                  height='auto'
                  controls
                  playing
                />
                <p className='text-sm font-normal text-center'>Preview this course</p>
                <h1 className='md:ml-6 font-semibold text-2xl'>₹500</h1>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <button onClick={handleAddToCart} className='add_to_cart_button'>
                    Add To Cart
                  </button>
                </div>
                <p className='text-sm font-normal text-center mt-2'>Full Lifetime Access</p>
              </div>
            </div>
          </div>
        </div>

        <div className='course_includes md:pl-32 mt-10'>
          <h1 className='md:text-4xl font-bold'>This Course Includes:</h1>
          <div className='grid md:grid-cols-3 grid-cols-1'>
            <div className='flex items-center'>
              <img src={video} alt="" />
              <p className='font-semibold text-lg'> Video Tutorials</p>
            </div>
            <div className='flex items-center'>
              <img src={downloadable_resources} alt="" />
              <p className='font-semibold text-lg'> Downloadable Resources</p>
            </div>
            <div className='flex items-center'>
              <img src={mobile} alt="" />
              <p className='font-semibold text-lg'> Access On Mobile</p>
            </div>
          </div>
        </div>

        <div className='course_content md:pl-32 mt-20 md:pr-32'>
          <h1 className='md:text-4xl font-bold'>Description:</h1>
          <p className='text-justify'>{course.bigDescription}</p>
        </div>

        <div className='course_content md:pl-32 mt-20 md:pr-32'>
          <h1 className='md:text-4xl font-bold'>Requirements:</h1>
          <p className='text-justify'>{course.requirements}</p>
        </div>

        <div className='course_content md:pl-32 mt-20'>
          <h1 className='md:text-4xl font-bold'>Course Content:</h1>
          {isPurchased ? (
            <>
              <p className='text-green-500 font-semibold mb-4'>Course Purchased</p>
            </>
          ) : (
            <p className='text-red-500 font-semibold mb-4'>Course Not Purchased</p>
          )}
          {course.chapters && course.chapters.length > 0 ? (
            course.chapters.map((chapter, index) => (
              <div key={index}>
                <h2 className='font-bold'>{chapter.title}</h2>
                {chapter.videos && chapter.videos.map((video, vIndex) => (
                  <ReactPlayer key={vIndex} url={video.videoUrl} controls className='w-200 h-80' />
                ))}
              </div>
            ))
          ) : (
            <p>No chapters available for this course.</p>
          )}
        </div>

        <div className='course_content md:pl-32 mt-20'>
          <h1 className='md:text-4xl font-bold'>Course Resources:</h1>
        </div>

        <div className='course_content md:pl-32 mt-20 md:pr-32'>
          <h1 className='md:text-4xl font-bold'>Meet Your Instructor</h1>
          <p><b>{course.instructor}</b></p>
          <p className='text-justify'>{course.instructorDescription}</p>
        </div>
      </section>

      {showModal && (
        <div className='add_to_cart_modal'>
          <div className='add_to_cart_modal_content'>
            <h1 className='mb-2'>Please log in to buy the course</h1>
            <button onClick={() => setShowModal(false)} className='font-bold'>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetail;
