
import { useState } from 'react';
import './App.css';
import VideoUpload from './components/videoUpload';
import VideoPlayer from './components/videoPlayer';
import Videos from './components/videos'
import axios from 'axios';


function App() {
 
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleVideoSelected = async (videoId:any) => {
    try {
      // Make a GET request to retrieve the video URL based on the videoId
      const response = await axios.get(`http://localhost:3001/video/videos/${videoId}`)
      console.log(videoId)
      if (response.status === 200) {
        
        setVideoUrl(response.data.videoUrl)
        console.log(response.data.videoUrl)
      } else {
        console.error('Failed to fetch video URL');
        // Handle error or display a message
      }
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  return (
    <div className="App">
      <VideoUpload />
      {videoUrl ? (
        <VideoPlayer videoUrl={videoUrl} />
      ) : (
        <p>Select a video to play</p>
      )}
      <Videos onVideoSelected={handleVideoSelected} />

    </div>
  );
}

export default App;
