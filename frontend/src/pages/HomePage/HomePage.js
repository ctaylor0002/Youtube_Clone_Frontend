import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import {KEY} from "../../API_Credentials"
import {DATA} from "../../API_Credentials"
import "./HomePage.css"
import { Link } from "react-router-dom"

import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]);

  const [videos, setVideos] = useState([])
  const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
      //setVideos(DATA.data.items);
      console.log(videos)

      fetchHomeVideos()
    }, [])

    function handleSearch(event) {
          event.preventDefault();
          searchHomeVideos();

        }

    const fetchHomeVideos = async () => {
      try {
        let response = await axios.get (`https://www.googleapis.com/youtube/v3/search?part=snippet&order=rating&type=video&videoDefinition=high&videoEmbeddable=true&maxResults=10&key=${KEY}`)
        setVideos(response.data.items)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
   
    const searchHomeVideos = async () => {
            
      try {
        let response = await axios.get (`https://www.googleapis.com/youtube/v3/search?q=${searchValue}&part=snippet&type=video&maxResults=9&key=${KEY}`)
        setVideos(response.data.items)
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }


    // const fetchUsers = async () => {
    //   try {
    //     let response = await axios.get("https://jsonplaceholder.typicode.com/users");
    //     console.log(response);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }


//   useEffect(() => {
    
//     const fetchCars = async () => {
//       try {
//         let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         });
//         setCars(response.data);
//       } catch (error) {
//         console.log(error.response.data);
//       }
//     };
//     fetchCars();
//   }, [token]);
// })
  return (
    <div className="video-list-container">
      <h1>Home Page for {user.username}!</h1>
      <form onSubmit={handleSearch}>
        <input type='text' placeholder="Search for Videos" onChange={(event) => setSearchValue(event.target.value)}/>
        <button type='submit'>Search</button>
      </form>
      <div className="video-container">
        {videos &&
        videos.map((video) => (
          <Link to={`/${video.id.videoId}`} key={video.id.videoId}>
            <div className="video" >
              <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
              <p key={video.id.videoId}>
                {video.snippet.title} - {video.snippet.channelTitle}
              </p>
            </div>
          </Link>
          
          
        ))}
      </div>
     
    </div>
  );
};

// return (
//   <div className="container">
//     <h1>Home Page for {user.username}!</h1>
//     {videos &&
//       videos.map((video) => (
//         <p key={videos.data.items.id}>
//           {videos.data.items.snippet.title} - {videos.data.items.id.videoId}
//         </p>
//       ))}
//   </div>
// );

export default HomePage;
