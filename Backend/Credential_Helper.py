from DB_Connection.Mongo_Conn import user_conn_details
from DB_Connection.Conn import conn
from mysql.connector import Error
from postpeer import PostPeer


def Connect_initilizer(username:str , user_email:str):
    query = "select * from user_cred where user_email = %s and username = %s "
    params = (user_email , username)
    try:
        mycur = conn.cursor();
        
        mycur.execute(query , params)
        result  = mycur.fetchone()
        print(result)
        user_id = result[0]

        with PostPeer() as client:
            profile = client.profiles.create(
                name=username,
                description=user_email,
            )

            peer_profile_id = profile.profile.id

        temp =  {
            "user_id": user_id , 
            "username": username , 
            "user_email": user_email , 
            "facebook" : False , 
            "instagram": False , 
            "linkedin" :False , 
            "twitter" : False   , 
            "profile_cred" : peer_profile_id
        }

        user_conn_details.insert_one(temp)

    
    except Exception as e : 
        print(e)    
    finally:
        mycur.close()