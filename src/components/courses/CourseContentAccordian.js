import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import VideoModal from './VideoModal'; 

const CourseContentAccordion = ({ courseName, isPurchased }) => {
  const [accordions, setAccordions] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoUrls, setVideoUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(firestore, "accordions"), where("courseName", "==", courseName));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAccordions(data);
    };

    fetchData();
  }, [courseName]);

  const handleToggle = (index) => {
    const content = document.getElementById(`accordion-collapse-body-${index}`);
    const icon = document.querySelector(`#accordion-collapse-heading-${index} svg`);
    if (content.classList.contains("hidden")) {
      content.classList.remove("hidden");
      icon.classList.remove("rotate-180");
    } else {
      content.classList.add("hidden");
      icon.classList.add("rotate-180");
    }
  };

  const handleVideoClick = (urls) => {
    setVideoUrls(urls);
    setShowVideoModal(true);
  };

  return (
    <div id="accordion-collapse" data-accordion="collapse" className="md:mr-32">
      {accordions.map((accordion, index) => (
        <div key={accordion.id}>
          <h2 id={`accordion-collapse-heading-${index}`}>
            <button
              type="button"
              className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right border ${
                index === accordions.length - 1 ? 'border-gray-200' : 'border-b-0 border-gray-200'
              }  dark:text-black bg-gray-100 gap-3`}
              data-accordion-target={`#accordion-collapse-body-${index}`}
              aria-expanded="false"
              aria-controls={`accordion-collapse-body-${index}`}
              onClick={() => handleToggle(index)}
            >
              <span className="text-lg">{accordion.title}</span>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.44l3.72-3.21a.75.75 0 111.04 1.1l-4.25 3.67a.75.75 0 01-1.04 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </h2>
          <div
            id={`accordion-collapse-body-${index}`}
            className="hidden"
            aria-labelledby={`accordion-collapse-heading-${index}`}
          >
            <div className="p-5 font-light border border-gray-200">
              <p>{accordion.content}</p>
              {isPurchased ? (
                <div className="flex flex-col">
                  {accordion.videoUrls.map((url, idx) => (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline mt-2"
                      onClick={(e) => {
                        e.preventDefault();
                        handleVideoClick(accordion.videoUrls);
                      }}
                    >
                      Watch Video {idx + 1}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-red-500 font-semibold mt-2">Purchase the course to access the videos</p>
              )}
            </div>
          </div>
        </div>
      ))}
      {showVideoModal && <VideoModal videoUrls={videoUrls} onClose={() => setShowVideoModal(false)} />}
    </div>
  );
};

export default CourseContentAccordion;
