import React from "react";
import { Carousel } from "antd";
import Card from "./Card";

const RecommendedSongsCarousel = ({ recommendedSongs, setCurrentSong }) => {
    console.log("from RecommendedSongsCarousel: ",recommendedSongs);
  return (
    <div className="bg-blue-200 p-3">
      <Carousel arrows infinite autoplay autoplaySpeed={5000} fade className="">
        {recommendedSongs.map((song, index) => (
          <div key={song._id}>
            <Card song={song} onPlay={() => setCurrentSong(song, index)} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default RecommendedSongsCarousel;
