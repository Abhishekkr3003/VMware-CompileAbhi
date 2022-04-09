import math
import os
import subprocess
import time
from flask import Flask, request
from werkzeug.utils import secure_filename
import uuid

import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("key.json")
firebase_admin.initialize_app(cred)


app = Flask(__name__)


@app.route("/")
def hello_world():
    db = firestore.client()
    todo_ref = db.collection('todos')
    return "<p>Server is LIVE.</p>"


@app.route("/submit", methods=["POST"])
def run_cpp():
    try:
        inp = request.files['input'].stream.read()
        # with open('Static/input.txt', 'r') as file:
        #     data = file.read()
        # print(data)
        unique_filename = str(uuid.uuid4())
        code = request.files['code']
        code.save(os.path.join("Static", secure_filename(unique_filename + ".cpp")))
        print("here")
        temp = subprocess.Popen(['g++', f'./Static/{unique_filename}.cpp', '-o', f'Static/{unique_filename}'],
                                stdout=subprocess.PIPE,
                                stderr=subprocess.PIPE)
        compiled = temp.communicate()
        os.remove(f"./Static/{unique_filename}.cpp")
        if compiled[1].decode('utf-8') == '':
            try:
                temp = subprocess.Popen([f"./Static/{unique_filename}"], stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                        stderr=subprocess.PIPE)
                temp.stdin.write(inp)
                begin = time.time()
                runtime = temp.communicate(timeout=1)
                os.remove(f"./Static/{unique_filename}")
                end = time.time()
                if runtime[1].decode('utf-8') == '':
                    print("Output: ")
                    output = runtime[0].decode('utf-8')
                    print(output)
                    time_taken = math.ceil((end - begin) * 1000)
                    print(f"Total runtime of the program is {time_taken}ms")
                    response = {
                        "Success": True,
                        "Output": output,
                        "Time:": time_taken
                    }
                    return response
                else:
                    print("Error: ")
                    error_ret = runtime[1].decode('utf-8')
                    print(error_ret)
                    response = {
                        "Success": False,
                        "Type": "RunTime Error",
                        "Error": error_ret
                    }
                    return response
            except Exception as e:
                print("TLE")
                response = {
                    "Success": False,
                    "Type": "TLE"
                }
                return response
        else:
            response = {
                "Success": False,
                "Type": "Compile Error",
                "Error": compiled[1].decode('utf-8')
            }
            return response
    except Exception as e:
        print(e)
        response = {
            "Success": False,
            "Type": "Unknown Error",
            "Error": str(e)
        }
        return response

