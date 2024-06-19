from pydantic import BaseModel

class LikeRequest(BaseModel):
    songId: int
    songName: str
    userId: str
    isLiked: int 

class userID(BaseModel):
    userId: str
