from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import HTTPException
import pandas as pd
import os
from fastapi.responses import FileResponse
import db
import getRecommendedSongs as grs
from model import LikeRequest, userID

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with the list of allowed origins if you know them
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db.connect_mongo()

@app.post("/getrecommendations")   
async def getReccomandation(user_id: userID):
    recommended_songs = grs.getRecommendedSongs(user_id.userId)
    return {"recommended_songs": recommended_songs}

@app.post("/getallsongs")
async def getAllSongs():
    response = db.getAllSongs()
    # print("responce: ",response)
    return {"allSongs": response}

@app.post("/likesong")
async def likeSong(like_request: LikeRequest):
    print(like_request)
    try:
        if(like_request.isLiked == 1):
            return (db.userLikedSong(like_request))
        else:
            return (db.userDisikedSong(like_request))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/getratings")
async def getAllRatings(user_id:userID):
    allRatedSongs = db.getSongRatings(user_id.userId)
    return {"allRatedSongs": allRatedSongs}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)