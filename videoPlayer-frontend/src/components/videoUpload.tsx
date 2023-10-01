import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

function VideoUpload() {
  const [video, setVideo] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideo(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!video) {
      alert('Please select a video file');
      return;
    }

    const formData = new FormData();
    formData.append('video', video);
    formData.append('title', title);
    formData.append('description', description);

    try {
      await axios.post('http://localhost:3001/video/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Video uploaded successfully');
    } catch (error) {
      console.error(error);
      alert('Error uploading video');
    }
  };

  return (
    <div>
      <h2>Upload a Video</h2>
      <input type="file" accept="video/*" onChange={handleVideoChange} />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default VideoUpload;
