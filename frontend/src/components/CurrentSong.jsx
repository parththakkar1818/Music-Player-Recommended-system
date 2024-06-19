import React from "react";
import {
  FaStepBackward,
  FaStepForward,
  FaPlay,
  FaPause,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa";

const CurrentSong = ({
  song,
  isPlaying,
  onPlayPauseClick,
  onNextClick,
  onPreviousClick,
  onLikeClick,
  isLiked,
  isDisliked,
}) => {
  return (
    <div className="w-screen h-24 bg-blue-600 text-white flex items-center justify-between p-4 fixed bottom-0">
      <div>
        <h1 className="text-xl font-bold">{song.Song_Name}</h1>
        <p className="text-gray-300">{song.Singer}</p>
      </div>
      <div className="flex items-center">
        <button onClick={onPreviousClick} className="text-white mx-2">
          <FaStepBackward size={24} />
        </button>
        <button onClick={onPlayPauseClick} className="text-white mx-2">
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        <button onClick={onNextClick} className="text-white mx-2">
          <FaStepForward size={24} />
        </button>
        <button onClick={() => onLikeClick("like")} className="text-white mx-2">
          <FaThumbsUp
            size={24}
            className={isLiked ? "text-green-600" : "text-white"}
          />
        </button>
        <button
          onClick={() => onLikeClick("dislike")}
          className="text-white mx-2"
        >
          <FaThumbsDown
            size={24}
            className={isDisliked ? "text-red-500" : "text-white"}
          />
        </button>
      </div>
    </div>
  );
};

export default CurrentSong;
