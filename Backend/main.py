import math
import os
import subprocess
import time
from flask import Flask, request
from werkzeug.utils import secure_filename
import uuid

import firebase_admin
from firebase_admin import credentials, firestore, storage

cred = credentials.Certificate("key.json")
firebase_admin.initialize_app(cred)


app = Flask(__name__)
db = firestore.client()


@app.route("/")
def home():
    return "<h1>Server is LIVE.</h1>"


@app.route("/user", methods=["POST"])
def get_user_data():
    try:
        user = request.json['userId']
        
        doc = db.collection(user).document(u'info').get()
        if doc.exists:
            user_data = doc.to_dict()
            docs=db.collection(user).stream()
            # response={"Success":True}
            files=[]
            for doc in docs:
                if doc.id!="info":
                    files.append(doc.to_dict())
            user_data['files']=files
            user_data["Success"] = True
            return user_data
        else:
            user_data = request.json
            db.collection(user).document(u'info').set(user_data)
            user_data["Success"] = True
            user_data['files'] = []
            return user_data

    except Exception as e:
        response = {
            "Success": False,
            "Error": str(e)
        }
        return response
    
@app.route("/delete-file", methods=["DELETE"])
def delete_file():
    try:
        file_data=request.json
        user_id=file_data['userId']
        file_id=file_data['fileId']
        doc=db.collection(user_id).document(file_id).delete()
        response={}
        response["Success"]=True
        return response
    except Exception as e:
        response = {
            "Success": False,
            "Error": str(e)
        }
        return response


@app.route("/add-file", methods=["POST"])
def add_file():
    try:
        
        file_data=request.json
        user_id=file_data['userId']
        file_id=file_data['fileId']
        file_data.pop('userId')
        
        db.collection(user_id).document(file_id).set(file_data)
        response = {
            "Success": True,
        }
        return response
    except Exception as e:
        response = {
            "Success": False,
            "Error": str(e)
        }
        return response
    
@app.route("/update-file", methods=["PATCH"])
def update_file():
    try:
        
        file_data=request.json
        user_id=file_data['userId']
        file_id=file_data['fileId']
        db.collection(user_id).document(file_id).update(file_data)
        response = {
            "Success": True,
        }
        return response
    except Exception as e:
        response = {
            "Success": False,
            "Error": str(e)
        }
        return response

@app.route("/read-file", methods=["POST"])
def read_file():
    try:
        file_data=request.json
        user_id=file_data['userId']
        file_id=file_data['fileId']
        file_data.pop('userId')
        doc=db.collection(user_id).document(file_id).get()
        response=doc.to_dict()
        response["Success"]=True
        return response
    except Exception as e:
        response = {
            "Success": False,
            "Error": str(e)
        }
        return response

@app.route("/directory", methods=["POST"])
def read_directory():
    try:
        file_data=request.json
        user_id=file_data['userId']
        docs=db.collection(user_id).stream()
        response={"Success":True}
        files=[]
        for doc in docs:
            if doc.id!="info":
                files.append(doc.to_dict())
        response['files']=files
        return response
    except Exception as e:
        response = {
            "Success": False,
            "Error": str(e)
        }
        return response


@app.route("/submission", methods=["POST"])
def run_test():
    try:
        inp = bytes(request.json['input'],'utf-8')
        print(type(inp))
        # with open('Static/input.txt', 'r') as file:
        #     data = file.read()
        # print(data)
        unique_filename = str(uuid.uuid4())
        code = request.json['code']
        with open(f'Static/{unique_filename}.cpp', 'w') as file:
            file.writelines(code)
        print(code)
            
        temp = subprocess.Popen(['g++', f'./Static/{unique_filename}.cpp', '-o', f'Static/{unique_filename}'],
                                stdout=subprocess.PIPE,
                                stderr=subprocess.PIPE)
        compiled = temp.communicate()
        os.remove(f"./Static/{unique_filename}.cpp")
        if compiled[1].decode('utf-8') == '':
            try:
                temp = subprocess.Popen([f"./Static/{unique_filename}"], stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                        stderr=subprocess.PIPE)
                print(inp)
                temp.stdin.write(inp)
                begin = time.time()
                runtime = temp.communicate(timeout=10)
                os.remove(f"./Static/{unique_filename}")
                end = time.time()
                if runtime[1].decode('utf-8') == '':
                    # print("Output: ")
                    output = runtime[0].decode('utf-8')
                    # print(output)
                    time_taken = math.ceil((end - begin) * 1000)
                    # print(f"Total runtime of the program is {time_taken}ms")
                    response = {
                        "Success": True,
                        "Output": output,
                        "Time:": time_taken
                    }
                    return response
                else:
                    # print("Error: ")
                    error_ret = runtime[1].decode('utf-8')
                    # print(error_ret)
                    response = {
                        "Success": False,
                        "Type": "RunTime Error",
                        "Error": error_ret
                    }
                    return response
            except Exception as e:
                print(str(e))
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

