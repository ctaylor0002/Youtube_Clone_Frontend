import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { KEY } from "../../API_Credentials";
import { Link } from 'react-router-dom';
import './VideoPage.css'
import useAuth from './../../hooks/useAuth';

const VideoPage = (props) => {
    const [user, token] = useAuth();
    const {videoID} = useParams();
    const [currentVideoData, setCurrentVideoData] = useState([]);
    const [videoComments, setVideoComments] = useState([]);
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [commentData, setCommentData] = useState('');

    useEffect(() => {
      getCurrentVideo();
      getVideoComments();
      getRelatedVideos();
      console.log(props)
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

    const getVideoComments = async () => {
      try {
        let response = await axios.get(`http://127.0.0.1:8000/api/comments/${videoID}/`)
        console.log(response);
        setVideoComments(response.data);
      } catch (error) {
        console.log(error)
      }
    }

    const createComment = async () => {
      try {
        const postInfo = ({"video_id": videoID, "text": commentData, "likes": 0, "dislikes": 0});
        let response = await axios.post(`http://127.0.0.1:8000/api/comments/${videoID}/comment/`, postInfo, {"headers": {Authorization: "Bearer " + token,}})
        let tempComments = [...videoComments, response.data];
        setVideoComments(tempComments);
        setCommentData('');
      } catch (error) {
        console.log(error);
      }
    }

    function handleSubmit(event) {
      event.preventDefault();
      createComment();
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
            
            <div className='comments'>
              {user ? (
                <form className='comment-form' onSubmit={handleSubmit}>
                  <textarea rows={"3"} columns={"100"} className='comment-input' placeholder='Add a comment...' value={commentData} onChange={(event) => setCommentData(event.target.value)}/>
                  <button className='button' type='submit'>Comment</button>
                </form>
              ) : (
                <h4>Please Login to leave comments.</h4>
              )}
              
              {videoComments &&
              videoComments.map((videoComment) => (
                <div className='comment'>
                  <div className='comment-header'>
                    <h4>{videoComment.user.username}</h4>
                  </div>
                  <div className='comment-body'>
                    <p className='comment-body-text'>{videoComment.text}</p>
                  </div>
                  <div className='comment-likes-dislikes'>
                    <p className='likes'>Likes: {videoComment.likes}</p>
                    <p className='dislikes'>Dislikes: {videoComment.dislikes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          
        </div>

        <div className='related-videos'>
          {relatedVideos &&
          relatedVideos.map((relatedVideo) => (
            <Link to={`/${relatedVideo.id.videoId}`} key={relatedVideo.id.videoId}>
              <div className="video" >
                <img src={relatedVideo.snippet.thumbnails.medium.url} alt={relatedVideo.snippet.description}/>
                <div className='related-video-description'>
                  <p className="related-video-description-title" key={relatedVideo.id.videoId}>
                    {relatedVideo.snippet.title}
                  </p>
                  <p className="related-video-description-channeltitle"key={relatedVideo.snippet.channelTitle}>
                    {relatedVideo.snippet.channelTitle}
                  </p>
                </div>
                
              </div>
            </Link>
          ))}
        </div>
      </div>
        
     );
}
 
export default VideoPage;