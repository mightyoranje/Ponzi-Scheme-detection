from flask import Flask, request
import numpy as np
import pandas as pd
import pickle
from tensorflow.keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.models import load_model
import re
from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS
import sqlite3

conn = sqlite3.connect('database.db')
conn.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)')
print("Created database successfully!")
conn.close()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
model = load_model("test_model1.h5")
tokenizer = Tokenizer()  # Use a fresh tokenizer
max_sequence_length = 5000  # can be changed
DATABASE = 'database.db'

def get_db():
    db = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db

def preprocess_opcode(opcode_string):
    opcodes = re.findall(r'\b[A-Z0-9]+(?=\s|$)', opcode_string)  
    sorted_opcodes = sorted(set(opcodes))  
    opcode_modified = ' '.join(sorted_opcodes) 
    opcode_sequence = tokenizer.texts_to_sequences([opcode_modified])  
    opcode_sequence_padded = pad_sequences(opcode_sequence, maxlen=max_sequence_length) 
    return opcode_sequence_padded

@app.route('/', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        data = request.json
        username = data.get('username')
        password = data.get('password')

        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
        user = cursor.fetchone()

        if username == '' or password == '':
            return jsonify({'success':False,'message':'Credentials cannot be empty'})

        if user:
            return jsonify({'success': True, 'redirect_url': '/success'})
        else:
            return jsonify({'success': False, 'message': 'Invalid credentials'})
    else:
        return "This is the server homepage"
    
conn.close()

@app.route('/success', methods=['GET', 'POST'])
def success():
    if request.method == 'POST':
        try:
            if 'file' not in request.files:
                return "No file part"

            opcode_file = request.files['file']
            smart_contract_df = pd.read_csv(opcode_file)
            opcodes = smart_contract_df['opcode'].values.tolist()  # Convert to list

            predictions = []
            for opcode in opcodes:
                preprocessed_input = preprocess_opcode(opcode)
                prediction = model.predict(preprocessed_input)
                predictions.append(prediction)

            is_ponzi = np.array(predictions) > 0.5
            result = ["Ponzi scheme" if ponzi else "Not a Ponzi scheme" for ponzi in is_ponzi]

            return {"result": result}

        except Exception as e:
            return str(e)

    else:
        # Handle GET request if needed
        return "Welcome to the server! Here lies the python code for ponzi prediction!"

if __name__ == '__main__':
    app.run(debug=True)