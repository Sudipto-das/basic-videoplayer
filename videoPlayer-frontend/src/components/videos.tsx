import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface VideosProps {
    onVideoSelected: (videoId: string) => void; // Define the prop for selecting a video
  }
  const Videos: React.FC<VideosProps> = ({ onVideoSelected }) => {
    const [videos, setVideos] = useState([])
    
    useEffect(() => {
        fetchVideos()
        console.log('videos mounted')
    }, [])

    const fetchVideos = () => {
        axios
            .get('http://localhost:3001/video/all',
                {
                    headers: {
                        "Content-type": "application/json"
                    }
                })
            .then((response) => {
                setVideos(response.data.videos)
                console.log(response.data.videos)
            })
    }
   
    return <div>
       <div>
            {Array.isArray(videos) && videos.length > 0 ? (
                videos.map((video:any) => (
                    <div key={video._id} className="video-item" style={{border:'1px solid green'}} >
                        <h3>{video.title}</h3>
                        <p>{video.description}</p>
                        <button onClick={()=>{onVideoSelected(video._id)}}>play</button>
                    </div>
                ))
            ) : (
                <p>No videos available</p>
            )}
        </div>
    </div>
}
export default Videos;