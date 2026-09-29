from flask import Flask , request
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS



app = Flask(__name__)

cors = CORS(app)



@app.route('/signup' , methods=['POST'])
def signup():
    


@app.route('/login' , methods=['POST'])
def login():
    return "Nothing"



@app.route('/check')
def checker():
    return "Nothing"



if(__name__ == '__main__'):
    app.run( debug=True)