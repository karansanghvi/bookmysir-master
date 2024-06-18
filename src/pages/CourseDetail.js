import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../components/contexts/CartContext';
import '../assets/styles/courses.css';
import course_preview from '../assets/images/dan-cristian-padure-h3kuhYUCE9A-unsplash.jpg';
import video from '../assets/images/ph_video.png';
import downloadable_resources from '../assets/images/ic_baseline-download.png';
import mobile from '../assets/images/uiw_mobile.png';
import CourseContentAccordian from '../components/courses/CourseContentAccordian';

const CourseDetail = ({ courses }) => {
  const { name } = useParams();
  const { addToCart } = useContext(CartContext);
  const course = courses.find((course) => course.name === name);

  if (!course) {
      return <div className='mt-32'>Course not found</div>;
  }

  const handleAddToCart = () => {
      addToCart({ ...course, price: 500 });
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
                              <p><b>Hours:</b> {course.hours}</p>
                              <p><b>Requirements:</b> {course.requirements}</p>
                              <p><b>Instructor Name:</b> {course.instructor}</p>
                          </div>
                          <div className='course_card'>
                              <img src={course_preview} alt="" className='p-4' />
                              <p className='text-sm font-normal text-center'>Preview this course</p>
                              <h1 className='md:ml-6 font-semibold text-2xl'>₹500</h1>
                              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                  <Link to="/cart" onClick={handleAddToCart} className='add_to_cart_button'>Add To Cart</Link>
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

              <div className='course_content md:pl-32 mt-20'>
                  <h1 className='md:text-4xl font-bold'>Course Content:</h1>
                  <CourseContentAccordian courseName={course.name} />
              </div>

              <div className='course_content md:pl-32 mt-20'>
                  <h1 className='md:text-4xl font-bold'>Requirements:</h1>
                  {/* <ul className="list-disc list-inside">
                      {course.requirements.map((requirement, index) => (
                          <li key={index}>{requirement}</li>
                      ))}
                  </ul> */}
              </div>
          </section>
      </>
  );
};

export default CourseDetail;
