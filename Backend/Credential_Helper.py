from DB_Connection.Mongo_Conn import user_conn_details
from DB_Connection.Conn import conn



def Connect_initilizer(username:str , user_email:str):
    query = "select * from user_cred where user_email = %s and username = %s "
    params = (user_email , username)
    try:
        mycur = conn.cursor();
        
        mycur.execute(query , params)
        result  = mycur.fetchone()
        print(result)
        user_id = result[0]
        

    except Exception as e : 
        pass
    finally:
        mycur.close()