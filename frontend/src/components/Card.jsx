import React, { useState } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
const Card = ({ song, onPlay }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="w-80 h-52 rounded overflow-hidden shadow-lg m-4 p-4 bg-white flex flex-col justify-between cursor-pointer"
      onClick={onPlay}
    >
      <div>
        <div className="font-bold text-xl mb-2">{song.Song_Name}</div>
        <p className="text-gray-700 text-base">
          <strong>Singer:</strong> {song.Singer}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Genre:</strong> {song.Genre}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Movie:</strong> {song.Movie}
        </p>
        <div className="absolute  items-center justify-center">
          <FaRegCirclePlay
            className={`m-2 text-4xl transition-all duration-200 ${
              hover ? "text-blue-500" : "text-gray-700"
            }`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
