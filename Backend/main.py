from flask import Flask , request , session
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS
from flask.json import jsonify
from DB_Connection.Conn import conn
from werkzeug.security import generate_password_hash , check_password_hash

app = Flask(__name__)
app.config["SECRET_KEY"] = "NiqjDsrX6aKCYHOurDo7aCK2ft1OB4DvsSKY8ujx+KM="

cors = CORS(app ,
             origins=["http://localhost:5173"]
            ,supports_credentials=True )


app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=False  
)

def session_checker(func):
    @wraps(func)
    def wrapper(*args , **kwargs):
        if("user_id" not in session):
            return jsonify({"message":"User not logged in"})  , 401

        return func(*args, **kwargs)
    return wrapper


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
            password = generate_password_hash(password)
            query = "insert into user_cred(user_email , username , user_password) values(%s , %s , %s)" 
            params = (user_email , username , password)
            
            mycur.execute(query , params)
            conn.commit()
            return jsonify({"message": "Account has been successfully created"}) , 200
    
    except mysql.connector.Error as e:
        conn.rollback()
    except Exception as e:
        print(e)
    finally:
        mycur.close()



@app.route('/login' , methods=['POST'])
def login():
    data = request.get_json()
    user_email  = data.get("email").strip()
    user_password = data.get("password").strip()
    try:
        query = "select * from user_cred where user_email=%s "
        params = (user_email,)
        mycursor = conn.cursor()
        mycursor.execute(query , params)
        result = mycursor.fetchone()
        if(result):
            valid = check_password_hash(result[3] , user_password)
            if(valid):
                session.clear()
                session["user_id"] = result[0]
                return jsonify({"message": "Logged in successfully"}) , 200 
            else:
                return jsonify({"message": "Incorrect password"}) , 401
        else:
            return jsonify({"message": "User name is not found"}) , 401
        
    except Exception as e :
        print(e)
    finally:
        mycursor.close()

        
@app.route('/check')
def checker():
    return "Nothing"



if(__name__ == '__main__'):
    app.run( debug=True)