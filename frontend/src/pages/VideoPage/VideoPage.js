import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { KEY } from "../../API_Credentials";
import { Link } from 'react-router-dom';
import './VideoPage.css'

const VideoPage = (props) => {
    const {videoID} = useParams();
    const [currentVideoData, setCurrentVideoData] = useState([]);
    const [relatedVideos, setRelatedVideos] = useState([]);

    useEffect(() => {
      getCurrentVideo();
      getRelatedVideos();
    }, [videoID])

    const getCurrentVideo = async () => {
      try {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?type=video&part=snippet&key=${KEY}&id=${videoID}`)
        console.log(response)
        setCurrentVideoData(response.data.items);
        console.log(currentVideoData)
      } catch (error) {
        console.log(error);
      }
    }
    const getRelatedVideos = async () => {
      try {
            let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoID}&type=video&part=snippet&key=${KEY}`)
            console.log(response)
            setRelatedVideos(response.data.items);

          } catch (error) {
            console.log(error);
          }
    }

    return ( 
      <div className='main-frame'>
        <div className='video-frame'>
          <iframe className='main-video' src={`https://www.youtube.com/embed/${videoID}`} title='Test'/>
          <div>
            {currentVideoData &&
            currentVideoData.map((currentVideo) =>(
              <div className='descriptions'>
                <h2 className='title'>{currentVideo.snippet.title}</h2>
                <h3 className='channel-title'>{currentVideo.snippet.channelTitle}</h3>
                <p className='description'>{currentVideo.snippet.description}</p>
              </div>
            ))}
          </div>
          
          
        </div>

        <div className='video-container'>
          {relatedVideos &&
          relatedVideos.map((relatedVideo) => (
            <Link to={`/${relatedVideo.id.videoId}`} key={relatedVideo.id.videoId}>
              <div className="video" >
                <img src={relatedVideo.snippet.thumbnails.medium.url} alt={relatedVideo.snippet.description}/>
                <p key={relatedVideo.id.videoId}>
                  {relatedVideo.snippet.title} - {relatedVideo.snippet.channelTitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
        
     );
}
 
export default VideoPage;