// idb.js
import { openDB } from "idb";

const dbPromise = openDB("songs-db", 1, {
  upgrade(db) {
    db.createObjectStore("songs");
  },
});

export const getSongsFromDB = async () => {
  return (await dbPromise).get("songs", "all");
};

export const setSongsToDB = async (songs) => {
  return (await dbPromise).put("songs", songs, "all");
};
