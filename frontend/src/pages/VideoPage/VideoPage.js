import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { KEY } from "../../API_Credentials"

const VideoPage = (props) => {
    const {videoID} = useParams();
    const [video, setVideo] = useState({});

    useEffect(() => {
      console.log(props)
      // const clickVideo = async () => {
      //   try {
      //     let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&id=${videoID}&key=${KEY}`)
      //     console.log(response)
          
      //     setVideo(response.data);
      //     console.log(video);
  
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
        
        console.log(video)
      //clickVideo();
    }, [videoID])

    

    return ( 
        <iframe src={`https://www.youtube.com/embed/${videoID}`} title='Test'/>
     );
}
 
export default VideoPage;