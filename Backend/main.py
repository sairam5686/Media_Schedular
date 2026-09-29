from flask import Flask , request
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS
from flask.json import jsonify
from Conn import conn
from werkzeug.security import generate_password_hash , check_password_hash
 


app = Flask(__name__)

cors = CORS(app )



@app.route('/signup' , methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get("UserName").strip()
    password = data.get("Password").strip()
    user_email = data.get("Email").strip()
    try:
        mycur = conn.cursor()
        query = "select * from user_cred where user_email=%s or username = %s"
        params = (user_email , username)
        mycur.execute(query , params)
        result = mycur.fetchall()
      

        if(len(result) != 0 ):
            return jsonify({"message": "The user or Email already exist"}) , 409
        else:
            
            query = "insert into user_cred(user_email , username , user_password) values(%s , %s , %s)" 
            params = (user_email , username , password)
            mycur.execute(query , params)
            conn.commit()
            return jsonify({"message": "Bhal bhalala"}) , 200
    except Exception:
        print(Exception)
    finally:
        mycur.close()




@app.route('/login' , methods=['POST'])
def login():
    return "Nothing"



@app.route('/check')
def checker():
    return "Nothing"



if(__name__ == '__main__'):
    app.run( debug=True)