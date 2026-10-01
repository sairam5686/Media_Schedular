import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")


# databases
db = myclient['Socialmedia']

# Collections
user_conn_details = db['User_connection_details']
