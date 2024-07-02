import React, { useState } from 'react';
import { firestore, storage } from '../../firebase'; // Import Firebase config

const VideoUploadForm = () => {
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !videoFile) return;

    try {
      // Upload video file to Firebase Storage
      const storageRef = storage.ref();
      const fileRef = storageRef.child(videoFile.name);
      await fileRef.put(videoFile);

      // Get download URL
      const downloadURL = await fileRef.getDownloadURL();

      // Add title and video URL to Firestore
      await firestore.collection('titles').add({
        title: title,
        videos: [downloadURL],
      });

      // Clear form fields after submission
      setTitle('');
      setVideoFile(null);
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title" />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Title and Video</button>
    </form>
  );
};

export default VideoUploadForm;
