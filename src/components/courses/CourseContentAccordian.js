import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import VideoModal from './VideoModal'; 

const CourseContentAccordion = ({ courseName }) => {
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
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id={`accordion-collapse-body-${index}`}
            className="hidden"
            aria-labelledby={`accordion-collapse-heading-${index}`}
          >
            <div className="p-5">
              <p className="mb-2 text-black">{accordion.content}</p>
              <div>
                {accordion.videoUrls.map((url, idx) => (
                  <div key={idx}>
                    <a
                      href={url}
                      className="text-blue-500 underline block mb-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Video {idx + 1}
                    </a>
                  </div>
                ))}
              </div>
              <button
                className="text-blue-500 underline sr-only"
                onClick={() => handleVideoClick(accordion.videoUrls)}
              >
                View Videos
              </button>
            </div>
          </div>
        </div>
      ))}
      <VideoModal show={showVideoModal} onClose={() => setShowVideoModal(false)} videoUrls={videoUrls} />
    </div>
  );
};

export default CourseContentAccordion;
