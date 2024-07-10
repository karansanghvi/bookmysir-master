import React, { useContext, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../components/contexts/CartContext';
import video from '../assets/images/ph_video.png';
import downloadable_resources from '../assets/images/ic_baseline-download.png';
import mobile from '../assets/images/uiw_mobile.png';
import '../assets/styles/courses.css';
import { auth, firestore } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { IoIosArrowBack, IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BsFillLockFill } from "react-icons/bs";
import ReactPlayer from 'react-player';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseDetail = ({ courses }) => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const course = courses.find((course) => course.name === name);
  // const [showModal, setShowModal] = useState(false);
  const isLoggedIn = localStorage.getItem('userID');
  const [isPurchased, setIsPurchased] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const courseContentRef = useRef(null);
  const [viewedLectures, setViewedLectures] = useState([]);
  // const [showCompletionModal, setShowCompletionModal] = useState(false);

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

  useEffect(() => {
    if (selectedChapter) {
      const storedViewedLectures = JSON.parse(localStorage.getItem(`${name}_${selectedChapter.title}_viewedLectures`)) || [];
      setViewedLectures(storedViewedLectures);
    }
  }, [selectedChapter, name]);

  const handleAddToCart = () => {
    const user = auth.currentUser;
    if (user) {
      addToCart({ ...course, price: 500 });
      navigate('/cart');
      toast.success('Course added to cart!');
    } else {
      // setShowModal(true);
      toast.info('Kindly log in to buy the course')
    }
  }

  const handleGoToCourse = () => {
    if (courseContentRef.current) {
      courseContentRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const handleVideoClick = (videoUrl, vIndex) => {
    if (!isPurchased) {
      toast.info("Purchase the course to see the video");
      return;
    }

    window.open(videoUrl, '_blank');

    setTimeout(() => {
      const updatedViewedLectures = [...viewedLectures];
      updatedViewedLectures[vIndex] = true;
      setViewedLectures(updatedViewedLectures);
      localStorage.setItem(`${name}_${selectedChapter.title}_viewedLectures`, JSON.stringify(updatedViewedLectures));

      checkIfCourseCompleted(updatedViewedLectures);
    }, 30000);
  };

  const checkIfCourseCompleted = (updatedViewedLectures) => {
    const allChapters = course.chapters;
    let allViewed = true;

    allChapters.forEach((chapter) => {
      const chapterViewedLectures = JSON.parse(localStorage.getItem(`${name}_${chapter.title}_viewedLectures`)) || [];
      if (chapterViewedLectures.length !== chapter.videos.length || chapterViewedLectures.includes(false)) {
        allViewed = false;
      }
    });

    if (allViewed) {
      // Save completed course details to localStorage
      const completedCourses = JSON.parse(localStorage.getItem('completedCourses')) || [];
      const courseLink = `/course/${course.name}`;
      const newCompletedCourse = { name: course.name, link: courseLink };
      completedCourses.push(newCompletedCourse);
      localStorage.setItem('completedCourses', JSON.stringify(completedCourses));

      // setShowCompletionModal(true);
      toast.success('Congratulations!! You have completed the course');
    }
  };

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    setSelectedTabIndex(1);
  };

  const handleBackClick = () => {
    setSelectedChapter(null);
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
                  {isPurchased ? (
                    <button onClick={handleGoToCourse} className='add_to_cart_button'>
                      Go To Course
                    </button>
                  ) : (
                    <button onClick={handleAddToCart} className='add_to_cart_button'>
                      Add To Cart
                    </button>
                  )}
                </div>
                <p className='text-sm font-normal text-center mt-2'>Full Lifetime Access</p>
              </div>
            </div>
          </div>
        </div>

        <div className='course_includes md:pl-32 mt-10 pl-6'>
          <h1 className='md:text-4xl text-2xl font-bold'>This Course Includes:</h1>
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

        <div className='course_content md:pl-32 mt-20 md:pr-32 pl-6 pr-6'>
          <h1 className='md:text-4xl text-2xl font-bold'>Description:</h1>
          <p className='text-justify'>{course.bigDescription}</p>
        </div>

        <div className='course_content md:pl-32 mt-20 md:pr-32 pl-6 pr-6'>
          <h1 className='md:text-4xl text-2xl font-bold'>Requirements:</h1>
          <p className='text-justify'>{course.requirements}</p>
        </div>

        <div className='course_content md:pl-32 mt-20 md:pr-32 pl-6 pr-6' ref={courseContentRef}>
          <h1 className='md:text-4xl text-2xl font-bold'>Course Content:</h1>
          {isPurchased ? (
            <>
              <p className='text-green-500 font-semibold mb-4'>Course Purchased</p>
            </>
          ) : (
            <p className='text-red-500 font-semibold mb-4'>Course Not Purchased</p>
          )}
          {course.chapters && course.chapters.length > 0 ? (
            <Tabs selectedIndex={selectedTabIndex} onSelect={setSelectedTabIndex}>
              <TabList>
                <Tab>
                  <h1 className='font-bold'>Overview</h1>
                </Tab>
                <Tab>
                  <h1 className='font-bold'>Content</h1>
                </Tab>
                <Tab>
                  <h1 className='font-bold'>Resources</h1>
                </Tab>
              </TabList>
              <TabPanel>
                {course.chapters.map((chapter, index) => (
                  <div key={index}>
                    <h2>Chapter {index + 1}: {chapter.title}</h2>
                    {isPurchased ? null : <BsFillLockFill className='ml-4 text-red-500' />}
                  </div>
                ))}
              </TabPanel>
              <TabPanel>
                {selectedChapter ? (
                  <div>
                    <div className='flex md:mb-4'>
                      <button className='flex items-center' onClick={handleBackClick}>
                        <IoIosArrowBack size={20} className='mr-2' />
                      </button>
                      <h1 className='font-semibold text-xl'>{selectedChapter.title}</h1>
                    </div>
                    {selectedChapter.videos && selectedChapter.videos.map((video, vIndex) => (
                      <div key={vIndex}>
                        <button
                          onClick={() => handleVideoClick(video.videoUrl, vIndex)}
                          className='flex'
                        >
                          <span>{`Lecture ${vIndex + 1}`}</span>
                          {viewedLectures[vIndex] && <IoIosCheckmarkCircleOutline className='ml-2 text-green-500' size={24} />}
                        </button>
                        <hr className='mt-4 mb-4' />
                      </div>
                    ))}
                  </div>
                ) : (
                  course.chapters.map((chapter, index) => (
                    <div key={index}>
                      <button onClick={() => handleChapterClick(chapter)}>
                        {chapter.title}
                      </button>
                      <hr className='mt-4' />
                    </div>
                  ))
                )}
              </TabPanel>
              <TabPanel>
                {selectedChapter ? (
                  <div>
                    <div className='flex md:mb-4'>
                      <button className='flex items-center' onClick={handleBackClick}>
                        <IoIosArrowBack size={20} className='mr-2' />
                      </button>
                      <h1 className='font-semibold text-xl'>{selectedChapter.title}</h1>
                    </div>
                    {selectedChapter.documents && selectedChapter.documents.map((document, dIndex) => (
                      <div key={dIndex}>
                        <a href={document.documentUrl} target="_blank" rel="noopener noreferrer">
                          Document {dIndex + 1}
                        </a>
                        <hr className='mt-4 mb-4' />
                      </div>
                    ))}
                  </div>
                ) : (
                  course.chapters.map((chapter, index) => (
                    <div key={index}>
                      <button onClick={() => handleChapterClick(chapter)}>
                        {chapter.title}
                      </button>
                      <hr className='mt-4' />
                    </div>
                  ))
                )}
              </TabPanel>
            </Tabs>
          ) : (
            <p>No chapters available for this course.</p>
          )}
        </div>

        <div className='course_content md:pl-32 mt-20 md:pr-32 pl-6 pr-6'>
          <h1 className='md:text-4xl text-2xl font-bold'>Meet Your Instructor</h1>
          <p className='mt-4'><b>{course.instructor}</b></p>
          <p className='text-justify'>{course.instructorDescription}</p>
        </div>
      </section>

      <ToastContainer/>

      {/* {showModal && (
        <div className='add_to_cart_modal'>
          <div className='add_to_cart_modal_content'>
            <h1 className='mb-2'>Please log in to buy the course</h1>
            <button onClick={() => setShowModal(false)} className='font-bold'>
              Close
            </button>
          </div>
        </div>
      )}

      {showCompletionModal && (
        <div className='add_to_cart_modal'>
          <div className='add_to_cart_modal_content'>
            <h1 className='mb-2'>Congratulations!! You have completed the course</h1>
            <button onClick={() => setShowCompletionModal(false)} className='font-bold'>
              Close
            </button>
          </div>
        </div>
      )} */}
    </>
  );
};

export default CourseDetail;