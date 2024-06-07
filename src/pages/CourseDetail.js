import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../components/contexts/CartContext';
import '../assets/styles/courses.css';
import course_preview from '../assets/images/dan-cristian-padure-h3kuhYUCE9A-unsplash.jpg';

const CourseDetail = ({ courses }) => {
  const { name } = useParams();
  const { addToCart } = useContext(CartContext);
  const course = courses.find((course) => course.name === name);

  if (!course) {
    return <div className='mt-32'>Course not found</div>;
  }

  const handleAddToCart = () => {
    addToCart({ ...course, price: 500 }); // Assuming price is 500 for all courses, update as necessary
  };

  return (
    <>
      <section className='mt-32'>
        <div className='course_hero'>
          <div className='pl-32 pt-8'>
            <div className='grid md:grid-cols-2 grid-cols-1'>
              <div>
                <h1 className='text-6xl font-bold mb-4'>{course.name}</h1>
                <p className='mb-4'>{course.description}</p>
              </div>
              <div className='course_card bg-white'>
                <img src={course_preview} alt="" className='rounded-xl' />
                <p className='text-sm font-normal text-center'>Preview this course</p>
                <h1>₹500</h1>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  {/* <button onClick={handleAddToCart} className='add_to_cart_button'>Add To Cart</button> */}
                  <Link to="/cart" onClick={handleAddToCart} className='add_to_cart_button'>Add To Cart</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Rest of the course details */}
      </section>
    </>
  );
};

export default CourseDetail;
