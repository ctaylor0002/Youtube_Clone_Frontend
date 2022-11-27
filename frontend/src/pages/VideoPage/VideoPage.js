import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { KEY } from "../../API_Credentials";
import { Link } from 'react-router-dom';

const VideoPage = (props) => {
    const {videoID} = useParams();
    const [relatedVideos, setRelatedVideos] = useState([]);

    useEffect(() => {
      getRelatedVideos();
    }, [videoID])

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
      <div>
        <iframe src={`https://www.youtube.com/embed/${videoID}`} title='Test'/>
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