import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Songs from "./Songs";
import CurrentSong from "./CurrentSong";
import {
  SignedIn,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import notifyError from "./Notification";
import { ToastContainer /*,toast*/ } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import { Carousel } from "antd";
import { getSongsFromDB, setSongsToDB } from "./IndexDB/idb";
import RecommendedSongsCarousel from "./RecommendedSongsCarousel ";


const Home = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [songsList, setSongsList] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isLoaded, isSignedIn, user } = useUser();
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  // const [allSongs, setallSongs] = useState([]);
  const prevIsSignedInRef = useRef(false);
  // console.log(user);

  const handlePlayPauseClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextClick = () => {
    console.log("called current idx: ", currentIndex);
    const nextIndex = (currentIndex + 1) % songsList.length;
    console.log(nextIndex);
    setCurrentIndex(nextIndex);
    console.log("called current idx: ", currentIndex);
    setCurrentSong(songsList[nextIndex]);
  };

  const handlePreviousClick = () => {
    const prevIndex = (currentIndex - 1 + songsList.length) % songsList.length;
    setCurrentIndex(prevIndex);
    setCurrentSong(songsList[prevIndex]);
  };

  const handleLikeClick = async (action) => {
    if (isSignedIn) {
      const likeStatus = action === "like" ? 1 : 0;
      setIsLiked(likeStatus === 1);
      setIsDisliked(likeStatus === 0);
      console.log(
        currentSong.Song_Id,
        currentSong.Song_Name,
        user["id"],
        likeStatus
      );
      try {
        const response = await fetch("http://localhost:8000/likesong", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            songId: currentSong.Song_Id,
            songName: currentSong.Song_Name,
            userId: user["id"],
            isLiked: likeStatus,
          }),
        });
        const data = await response.json();
        console.log(data.message);
        setUserRatings((prevRatings) => ({
          ...prevRatings,
          [currentSong.Song_Id]: likeStatus,
        }));
      } catch (error) {
        console.error("Error liking song:", error);
      }
    } else {
      notifyError("You need to be logged in to like a song.");
      console.log("login");
    }
  };

  const getAllRatedSongs = async () => {
    if (isSignedIn) {
      try {
        const response = await fetch("http://localhost:8000/getratings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user["id"],
          }),
        });
        const dataJSON = await response.json();
        const data = dataJSON.allRatedSongs;
        // console.log("data: ", data);
        const ratings = data.reduce((acc, rating) => {
          acc[rating.songId] = rating.isLiked;
          return acc;
        }, {});
        // console.log("inside function: ", ratings);
        setUserRatings(ratings);
      } catch (error) {
        console.error("Error liking song:", error);
      }
    }
  };

  const handleSetCurrentSong = (song, index) => {
    setCurrentSong(song);
    setCurrentIndex(index);
    const isLiked = userRatings[song.Song_Id] === 1;
    const isDisliked = userRatings[song.Song_Id] === 0;
    // console.log("from handlecurrentsong :", isLiked, isDisliked);
    // console.log(userRatings);/
    setIsLiked(isLiked);
    setIsDisliked(isDisliked);
  };

  const fetchRecommendedSongs = async () => {
    if (isSignedIn) {
      try {
        const response = await fetch(
          "http://localhost:8000/getrecommendations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user["id"],
            }),
          }
        );
        const data = await response.json();
        const storedSongs = await getSongsFromDB();
        const recommendedSongs = Object.keys(data.recommended_songs);

        const recommendedSongDetails = recommendedSongs.map((songName) => {
          const songDetail = storedSongs.find(
            (song) => song.Song_Name === songName
          );
          return songDetail;
        });
        console.log("all rec songs from here: ",recommendedSongDetails); 
        setRecommendedSongs(recommendedSongDetails);
      } catch (error) {
        console.error("Error fetching recommended songs:", error);
      }
    }
  };

  // useEffect(() => {
  //   if (songsList.length > 0) {
  //     // setCurrentIndex(0);
  //     // setCurrentSong(songsList[0]);
  //   }
  // }, [songsList]);

  useEffect(() => {
    // Only fetch rated songs when the user signs in
    if (isSignedIn && !prevIsSignedInRef.current) {
      getAllRatedSongs();
      fetchRecommendedSongs();
    }
    // Update the ref with the current value of isSignedIn
    prevIsSignedInRef.current = isSignedIn;
  }, [isSignedIn]);

  return (
    <div className="relative min-h-screen pb-24">
      <Navbar />
      <button onClick={fetchRecommendedSongs}>fetch</button>
      {recommendedSongs != null && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-4">
            Recommended Songs
          </h2>
          <RecommendedSongsCarousel
            recommendedSongs={recommendedSongs}
            setCurrentSong={handleSetCurrentSong}
          />
        </div>
      )}
      <Songs
        setCurrentSong={handleSetCurrentSong}
        setSongsList={setSongsList}
      />
      {currentSong && (
        <CurrentSong
          song={currentSong}
          isPlaying={isPlaying}
          onPlayPauseClick={handlePlayPauseClick}
          onNextClick={handleNextClick}
          onPreviousClick={handlePreviousClick}
          onLikeClick={handleLikeClick}
          isLiked={isLiked}
          isDisliked={isDisliked}
        />
      )}
    </div>
  );
};

export default Home;
