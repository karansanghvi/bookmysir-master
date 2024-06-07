import React from 'react';
import HeroBanner from '../components/homepage/HeroBanner';
import bmsdo from '../assets/images/Education-cuate.png';
import get1 from '../assets/images/get1.png';
import get2 from '../assets/images/get2.png';
import get3 from '../assets/images/get3.png';
import get4 from '../assets/images/get4.png';
import getimg from '../assets/images/Mobile user-rafiki.png';
import coursecircle from '../assets/images/blog-shape.png';
import appphone from '../assets/images/mockup-removebg-preview.png';
import '../assets/styles/style.css';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Home() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000
  }

  return (
    <>
     <HeroBanner/>

     {/* WHAT DOES BMS DO? */}
     <section>
      <h1 className='text-center text-6xl font-bold mt-10'>What Does <span className='text-[#EE4962] font-bold'>BMS</span> Do?</h1>
      <div className='grid md:grid-cols-2 grid-cols-1'>
        <div>
          <img src={bmsdo} alt="" className='w-200 h-80 md:pl-40 pl-10 pr-10 pt-10' />
        </div>
        <div>
          <p className='pt-10 text-xl text-justify font-normal md:pr-40 md:pl-0 pl-10 pr-10 mb-4'>At BMS, we believe in the power of personalized education to transform lives. Our mission is to provide high-quality home tuition services that inspire learning, boost confidence, and foster academic success. With experienced tutors, tailored learning plans, and a commitment to excellence, we're here to support students on their educational journey.</p>
          <Link to="/aboutus" className='loginbutton font-bold md:ml-0 ml-20'>View More</Link>
        </div>
      </div>
     </section>

     <br /> <br /> <br /> <br />

     {/* WHAT YOU GET FROM US? */}
     <section>
      <h1 className='text-center md:text-6xl text-3xl font-bold'>What You <span className='text-[#EE4962] font-bold'>Get</span> From Us?</h1>
      <div className='grid md:grid-cols-2 grid-cols-1'>
        <div className='md:pl-40 pt-10'>
          <div className="flex items-start space-x-4 mb-4">
            <img src={get1} alt="" className="md:w-25 md:h-25 w-20 h-20" />
            <div>
              <h1 className="md:text-3xl text-2xl font-medium">Personalized Learning Plans</h1>
              <p className="font-normal text-md md:text-justify">
                Customized learning plans that address areas of weakness while capitalizing on the student's strengths and interests.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 mb-4">
            <img src={get2} alt="" className="md:w-25 md:h-25 w-20 h-20" />
            <div>
              <h1 className="md:text-3xl text-2xl font-medium">Regular Progress Monitoring</h1>
              <p className="font-normal text-md md:text-justify">
                Regularly assess the student's progress and adjust the learning plan as needed to ensure continuous improvement. Provide feedback to both the student and parents to keep them informed of the student's achievements and areas for growth.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 mb-4">
            <img src={get3} alt="" className="md:w-25 md:h-25 w-20 h-20" />
            <div>
              <h1 className="md:text-3xl text-2xl font-medium">Personalized Video Lectures</h1>
              <p className="font-normal text-md md:text-justify">
                Provide additional resources and support materials to supplement the tutoring sessions, such as practice exams, study guides. Offer access to online resources and support between sessions.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 mb-4">
            <img src={get4} alt="" className="md:w-25 md:h-25 w-20 h-20" />
            <div>
              <h1 className="md:text-3xl text-2xl font-medium">Communication</h1>
              <p className="font-normal text-md md:text-justify">
                Maintain open lines of communication with both the student and parents to address any concerns or questions promptly. Encourage feedback and suggestions to continuously improve the quality of service.
              </p>
            </div>
          </div>
        </div>
        <div>
          <img src={getimg} alt="" className='md:pl-10 getmain' />
        </div>
      </div>
     </section>

     <br /> <br /> <br /> <br />

     {/* STATISTICS */}
     <section>
      <div className='grid md:grid-cols-4 grid-cols-1 md:pl-32 pl-10 md:pr-0 pr-10'>
          <div className='card1 mb-4'>
            <h1 className='statistics_number'>18.26%</h1>
            <p className='statistics_title text-center'>Grade Improvement</p>
          </div>
        <div>
          <div className='card2 mb-4'>
            <h1 className='statistics_number'>97.28%</h1>
            <p className='statistics_title text-center'>Retention Rate</p>
          </div>
        </div>
        <div>
          <div className='card1 mb-4'>
            <h1 className='statistics_number'>28</h1>
            <p className='statistics_title text-center'>States Served</p>
          </div>
        </div>
        <div>
          <div className='card2 mb-4'>
            <h1 className='statistics_number'>9</h1>
            <p className='statistics_title text-center'>Years Of Experience</p>
          </div>
        </div>
      </div>
     </section>

     <br /> <br /> <br /> <br />

     {/* COURSE CATEGORIES */}
     <section className="coursesection mb-2" id="blog" aria-label="blog">
        <div className="flex justify-center mb-4">
          <img src={coursecircle} width="186" height="186" loading="lazy" alt="" className="circle" />
        </div>
        <h1 className='text-center coursetitle'><span className='text-[#EE4962]'>Course</span> Categories</h1>
        <div className='grid md:grid-cols-3 grid-cols-1 md:pl-32 pl-10 md:pr-32 pr-10 gap-4'>
          <div className='coursecard flex flex-col mb-4'>
          <h1 className='coursetitle text-center'>9th & 10th Standard</h1>
            <p className='text-center text-black font-medium mb-4'>(Mathematics & Science)</p>
            <p className='text-black pl-10 mb-2'>This includes:</p>
            <div className='flex items-start space-x-4 ml-10'>
              <FaCheck className='w-4 h-4' />
              <p>ICSE Board</p>
            </div>
            <div className='flex items-start space-x-4 ml-10'>
              <FaCheck className='w-4 h-4' />
              <p>CBSE Board</p>
            </div>
            <div className='flex items-start space-x-4 ml-10 md:mb-0 mb-4'>
              <FaCheck className='w-4 h-4' />
              <p>HSC Board</p>
            </div>
          </div>
          <div className='coursecard flex flex-col mb-4'>
            <h1 className='coursetitle text-center'>11th & 12th Standard</h1>
            <p className='text-center text-black font-medium mb-4'>(Mathematics & Science)</p>
            <p className='text-black pl-10 mb-2'>This includes:</p>
            <div className='flex items-start space-x-4 ml-10'>
              <FaCheck className='w-4 h-4' />
              <p>HSC Board</p>
            </div>
            <div className='flex items-start space-x-4 ml-10 mb-10'>
              <FaCheck className='w-4 h-4' />
              <p>CBSE Board</p>
            </div>
          </div>
          <div className='coursecard flex flex-col mb-4'>
            <h1 className='coursetitle text-center'>Engineering</h1>
            <p className='text-black pl-10 mb-2'>This includes:</p>
            <div className='flex items-start space-x-4 ml-10'>
              <FaCheck className='w-4 h-4' />
              <p>Mechanical Engineering</p>
            </div>
            <div className='flex items-start space-x-4 ml-10'>
              <FaCheck className='w-4 h-4' />
              <p>Electronics Engineering</p>
            </div>
            <div className='flex items-start space-x-4 ml-10'>
              <FaCheck className='w-4 h-4' />
              <p>Electronics & Telecommunication Engineering</p>
            </div>
            <div className='flex items-start space-x-4 ml-10'>
              <FaCheck className='w-4 h-4' />
              <p>Production Engineering</p>
            </div>
            <div className='flex items-start space-x-4 ml-10'>
              <FaCheck className='w-4 h-4' />
              <p>Civil Engineering</p>
            </div>
            <div className='flex items-start space-x-4 ml-10 md:mb-0 mb-4'>
              <FaCheck className='w-4 h-4' />
              <p>Automobile Engineering</p>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKMYSIR APP */}
      <section>
        <div className='grid md:grid-cols-2 grid-cols-1 md:pl-32 pl-10'>
          <div>
            <h1 className='apptext mb-5'><span className='downloadtext'>Download</span> <br/> The bookmysir App Now!!</h1>
            <Link 
              to="https://play.google.com/store/apps/details?id=co.learnol.hrvvo" 
              className='loginbutton font-bold md:ml-0 ml-2'
            >
              Download Now
            </Link>
          </div>
          <div>
            <img src={appphone} alt="" />
          </div>
        </div>
      </section>

      <br /> <br /> <br /> <br />

      {/* TESTIMONIALS */}
      <section>
        <h1 className='text-center text-5xl font-bold'>See what others are achieving through <span className='text-[#EE4962]'>learning</span></h1>
        <div className='w-3/4 m-auto'>
          <div className='mt-10'>
            <Slider {...settings}>
              {data.map((d) => (
                <div key={d.name} className="text-black rounded-xl testimonial_card">
                  <div className="flex flex-col items-center justify-center gap-4 p-10">
                    <p className="text-2xl font-bold">{d.name}</p>
                    <p className="text-justify">{d.review}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </>
  )
}

const data = [
  {
    name: `Ritesh Vishwakarma`,
    review: `As I prepared for my exams, I sought additional support from BMS. I must say, the tutors at BMS are truly remarkable! Their profound knowledge of the subjects and adeptness at simplifying complex concepts have been immensely beneficial. Thanks to their guidance and encouragement, my confidence going into exams has soared. I am deeply grateful to BMS for their invaluable assistance.`
  },
  {
    name: `Karan Shah`,
    review: `Since enrolling my child in the home tuition program offered by BMS, I've observed remarkable strides in their academic performance. The tutors at BMS exhibit exceptional patience and understanding, adeptly catering to my child's unique learning style and pace.`
  },
  {
    name: `Manoj Sharma`,
    review: `Having engaged with BMS for over a year now, I am satisfied with the exceptional support they've provided to my child. The tutors at BMS are not only highly qualified but also deeply committed towards nurturing the academic journey. Their personalized approach and meticulously tailored lesson plans have been instrumental in elevating child's performance significantly. I confidently recommend BMS to any parent seeking top-notch tutoring services that prioritize student success.`
  }
];

export default Home
