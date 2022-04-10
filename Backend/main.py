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


@app.route("/")
def home():
    return "<h1>Server is LIVE.</h1>"




@app.route("/user", methods=["POST"])
def get_user_data():
    try:
        user = request.json['userId']
        db = firestore.client()
        doc = db.collection(u'users').document(user).get()
        if doc.exists:
            user_data = doc.to_dict()
            user_data["Success"] = True
            return user_data
        else:
            user_data = request.json
            user_data['directoryStructure'] = '[{id:"root", type: "folder", name: "root", children=[ { id = ' + \
                user+', type: "file", name: '+user+' }] }];'
            db.collection(u'users').document(user).set(user_data)
            user_data["Success"] = True
            return user_data

    except Exception as e:
        response = {
            "Success": False,
            "Error": str(e)
        }
        return response


@app.route("/new-directory", methods=["PATCH"])
def update_directory():
    try:
        user = request.json['userId']
        new_directory_structure = request.json['directoryStructure']
        db = firestore.client()
        db.collection(u'users').document(user).update(
            {'directoryStructure': new_directory_structure})
        response = {
            "Success": True
        }
        return response

    except Exception as e:
        response = {
            "Success": False,
            "Error": str(e)
        }
        return response


@app.route("/publish", methods=["POST"])
def run_cpp_():
    try:
        file_id = request.form['fileId']
        user_id = request.form['userId']
        file = request.files['file']
        file.save(os.path.join(
            "Static", secure_filename(str(file_id))))
        fileName = f"./Static/{file_id}"
        bucket = storage.bucket("compileabhi-6c85a.appspot.com")
        blob = bucket.blob(f"{user_id}/{file_id}")
        blob.upload_from_filename(fileName)
        blob.make_public()
        url = blob.public_url
        os.remove(f"./Static/{file_id}")
        response = {
            "Success": True,
            "URL": url
        }
        return response
    except Exception as e:
        response = {
            "Success": False,
            "Error": str(e)
        }
        return response


@app.route("/submission", methods=["POST"])
def run_cpp():
    try:
        inp = request.files['input'].stream.read()
        # with open('Static/input.txt', 'r') as file:
        #     data = file.read()
        # print(data)
        unique_filename = str(uuid.uuid4())
        code = request.files['code']
        code.save(os.path.join(
            "Static", secure_filename(unique_filename + ".cpp")))
        # print("here")
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
                # print("TLE")
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
        # print(e)
        response = {
            "Success": False,
            "Type": "Unknown Error",
            "Error": str(e)
        }
        return response
    
@app.route("/test", methods=["POST"])
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

