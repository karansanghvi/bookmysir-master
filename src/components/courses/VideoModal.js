import React from 'react';
import ReactPlayer from 'react-player';

const VideoModal = ({ videoUrls, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-red-500 font-bold"
          onClick={onClose}
        >
          X
        </button>
        <div className="w-full h-full">
          {videoUrls.map((url, index) => (
            <ReactPlayer
              key={index}
              url={url}
              width="100%"
              height="auto"
              controls
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
