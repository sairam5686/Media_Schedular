from DB_Connection.Mongo_Conn import User_account_details

def Platform_maker(platform , user_id):
    temp = []
    for i in platform:
        result = User_account_details.find_one({"user_id":user_id  , "platform":i})
        # print(result)
        temp_dict = {"platform": result['platform'], "accountId": result['account_id']}
        temp.append(temp_dict)
    return(temp)

# Platform_maker(["linkedin" , "twitter" , "facebook" ] ,12  )