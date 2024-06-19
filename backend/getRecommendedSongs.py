import pandas as pd
import pymongo
# from sklearn.preprocessing import LabelEncoder
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["music_player"]
 
item_similarity_df = None
def get_similar_song(song_name, user_rating):
    similar_score= item_similarity_df[song_name]*(user_rating-0.5)
    similar_score = similar_score.sort_values(ascending=False)

    return similar_score


def getRecommendedSongs(userId):
    global item_similarity_df

    # songs = pd.read_csv("../Dataset/songs.csv")
    my_col = mydb["ratings"]
    songs_cur = my_col.find()
    songs=[]
    for i in songs_cur:
        songs.append(i)
    # print(songs)
    songs_df = pd.DataFrame(songs)
    # print(songs_df.head(2))
    # songs_df.drop(["_id"], axis= 1)
    user_ratings = songs_df.pivot_table(index=["userId"], columns= "songName", values = "isLiked")
    user_ratings = user_ratings.fillna(0)
    # print(user_ratings)
    item_similarity_df = user_ratings.corr(method="pearson")
    # print(item_similarity_df.head())
    
    

    user = {(row["songName"], row["isLiked"]) for _, row in songs_df.iterrows() if row["userId"] == userId}
    print(user)
    
    similar_songs = []
    for song,rating in user:
        similar_songs.append(get_similar_song(song,rating))

    similar_songs_df = pd.DataFrame(similar_songs)
    # print(similar_movies_df)
    recommended_songs = similar_songs_df.sum().sort_values(ascending=False)[0:5]    
    return recommended_songs

    
# getReccomandateSongs('user_2hlZ6nNs85T3Rm0rjhJ7nZWEQka')