import pymongo
from bson import ObjectId

myclient = None
mydb = None

def connect_mongo():
    global myclient
    global mydb
    try:
        myclient = pymongo.MongoClient("mongodb://localhost:27017/")
        mydb = myclient["music_player"]
        print("Connected to MongoDB successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")
    

def getAllSongs():
    if mydb is None:
        print("Database connection is not established.")
        return []
    try:
        mycol = mydb["songs"]
        all_songs_cur = mycol.find()
        all_songs = []
        for song in all_songs_cur:
            song['_id'] = str(song['_id'])
            all_songs.append(song)
        return all_songs
    
    except Exception as e:
        print(f"An error occurred while fetching songs: {e}")
        # Handle other exceptions
        return []
    
def userLikedSong(like_request):
    my_col= mydb["ratings"]
    alreadyDisliked = my_col.find_one({
        "songId": like_request.songId,
        "userId": like_request.userId,
    })
    if alreadyDisliked:
        my_col.find_one_and_update(
            {
                "songId": like_request.songId,
                "userId": like_request.userId
            },
            {
                "$set": {"isLiked": 1}
            }
        )
    else:
        my_col.insert_one({
            "songId": like_request.songId,
            "songName": like_request.songName,
            "userId": like_request.userId,
            "isLiked": 1
        })
    return {"message": "Song liked successfully"}   

def userDisikedSong(like_request):
    my_col= mydb["ratings"]
    alreadyLiked = my_col.find_one({
        "songId": like_request.songId,
        "userId": like_request.userId,
    })
    if alreadyLiked:
        my_col.find_one_and_update(
            {
                "songId": like_request.songId,
                "userId": like_request.userId
            },
            {
                "$set": {"isLiked": 0}
            }
        )
    
    else:
        my_col.insert_one({
            "songId": like_request.songId,
            "songName": like_request.songName,
            "userId": like_request.userId,
            "isLiked": 0
        })  
    return {"message": "Song disliked successfully"}   

def getSongRatings(userId):
    my_col = mydb["ratings"]
    ratings_cur = my_col.find({"userId":userId});
    all_rated_songs = []
    for i in ratings_cur:
        i["_id"] = str(i["_id"])
        all_rated_songs.append(i)
    return all_rated_songs
