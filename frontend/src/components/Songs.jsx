import React, { useState, useEffect } from "react";
import Card from "./Card";
import { getSongsFromDB, setSongsToDB } from "./IndexDB/idb";
import Loading from "./Loading";

const Songs = ({ setCurrentSong, setSongsList }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSongs = async () => {
    try {
      const response = await fetch("http://localhost:8000/getallsongs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setSongs(data.allSongs);
      setSongsToDB(data.allSongs);
      setSongsList(data.allSongs);
      // localStorage.setItem("songs", JSON.stringify(data.allSongs));
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchFromIndexedDB = async () => {
      const storedSongs = await getSongsFromDB();
      if (storedSongs) {
        console.log("songs stored");
        setSongs(storedSongs);
        setSongsList(storedSongs);
        setLoading(false);
      } else {
        fetchSongs();
      }
    };
    fetchFromIndexedDB();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-center mt-3">
        {loading ? (
          <Loading />
        ) : songs.length > 0 ? (
          songs.map((song, index) => (
            <div>
              <Card
                key={song._id}
                song={song}
                onPlay={() => setCurrentSong(song, index)}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-lg mt-4">No songs available</p>
        )}
      </div>
    </div>
  );
};

export default Songs;
