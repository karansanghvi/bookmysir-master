// src/components/VideoModal.js
import React from 'react';

const VideoModal = ({ show, onClose, videoUrl }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md max-w-md w-full">
                <button onClick={onClose} className="text-right text-red-500 font-bold">X</button>
                {videoUrl ? (
                    <video src={videoUrl} controls className="w-full mt-2"></video>
                ) : (
                    <p>No video URL available</p>
                )}
            </div>
        </div>
    );
};

export default VideoModal;
