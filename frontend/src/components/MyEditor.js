// code editor

import React, { useState, useEffect } from "react";
import "../styles/editor.css";
import { Form, Button } from "react-bootstrap";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import { VscRocket } from "react-icons/vsc";
import {
  setCodeRedux,
  setOutputRedux,
  deleteOpenFiles,
  editFileCode,
  editOpenFileCode,
  closeFile,
} from "../actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BsClock, BsFillFileEarmarkCodeFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/material.css";
import "codemirror/theme/base16-dark.css";

import "codemirror/theme/mdn-like.css";
import "codemirror/theme/the-matrix.css";
import "codemirror/theme/night.css";

import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/clike/clike";

import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";

import { Controlled as ControlledEditorComponent } from "react-codemirror2";

export default function MyEditor() {
  const [code, setCode] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [dummy, setDummy] = useState(true);
  const [currentFile, setCurrentFile] = useState({});

  const input = useSelector((state) => state.input);
  const persistCode = useSelector((state) => state.code);
  const openFiles = useSelector((state) => state.openFiles);
  const files = useSelector((state) => state.structure);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setCode(persistCode);
  }, []);

  const dispatch = useDispatch();

  // const onChange = (event) => {
  //   setCode(event.target.value);
  //   dispatch(setCodeRedux(event.target.value));
  // };

  const submit = async () => {
    setLoading(true);
    var data = {
      input: input,
      code: code,
    };
    const response = await axios.post("http://3.108.190.41/submission", data);
    if (user.userId != undefined) {
      const payload = {
        userId: user.userId,
        id: currentFile.id,
        code: code,
      };
      console.log(payload);
      await axios.patch("http://3.108.190.41/update-file", payload);
    }
    setLoading(false);
    dispatch(setOutputRedux(response.data));
  };

  const onRemoveFile = (id) => {
    if (currentFile.id == id) {
      setCurrentFile({});
      setCode("");
    }
    dispatch(deleteOpenFiles(id));
    dispatch(closeFile(id));
    setDummy(!dummy);
  };

  if (openFiles.length === 0 || currentFile.id === undefined) {
    return (
      <div className="editor">
        <div className="editorFilesOpened">
          {files.map((file) => {
            return (
              file.isOpen && (
                <div key={file.id} className="fileBarActionDiv">
                  <Button
                    className="fileNameButton"
                    variant="outline-dark"
                    onClick={() => {
                      setCurrentFile(file);
                      setCode(file.code);
                      dispatch(setCodeRedux(file.code));
                    }}
                  >
                    {file.name}
                  </Button>
                  <Button
                    onClick={() => onRemoveFile(file.id)}
                    className="fileNameButton"
                    variant="outline-dark"
                  >
                    <AiOutlineClose />
                  </Button>
                </div>
              )
            );
          })}
        </div>
        <div className="editFile noFile">
          <h1 className="noFileHeading">
            Click a file to edit <BsFillFileEarmarkCodeFill />
          </h1>
        </div>
      </div>
    );
  }

  const handleChange = (editor, data, code) => {
    setCode(code);
    dispatch(setCodeRedux(code));
    console.log(currentFile);
    const data2 = {
      itemId: currentFile.id,
      code: code,
    };
    console.log(data2);
    dispatch(editFileCode(data2));
    dispatch(editOpenFileCode(data2));
  };

  return (
    <div className="editor">
      <div className="editorFilesOpened">
        {files.map((file) => {
          return (
            file.isOpen && (
              <div key={file.id} className="fileBarActionDiv">
                <Button
                  className="fileNameButton"
                  variant="outline-dark"
                  onClick={() => {
                    setCurrentFile(file);
                    setCode(file.code);
                    dispatch(setCodeRedux(file.code));
                  }}
                >
                  {file.name}
                </Button>
                <Button
                  onClick={() => onRemoveFile(file.id)}
                  className="fileNameButton"
                  variant="outline-dark"
                >
                  <AiOutlineClose />
                </Button>
              </div>
            )
          );
        })}
      </div>
      <div className="editFile">
        {/* <Editor
          value={code}
          onValueChange={(code) => {
            setCode(code);
            dispatch(setCodeRedux(code));
            console.log(currentFile);
            const data = {
              itemId: currentFile.id,
              code: code,
            };
            console.log(data);
            dispatch(editFileCode(data));
            dispatch(editOpenFileCode(data));
          }}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          tabSize={4}
          preClassName="textareaClassName"
          style={{
            fontSize: "1rem",
            height: "100%",
          }}
        /> */}
        <ControlledEditorComponent
          onBeforeChange={handleChange}
          value={code}
          className="textareaClassName"
          options={{
            lineWrapping: true,
            lint: true,
            mode: "clike",
            lineNumbers: true,
            theme: "base16-dark",
            autoCloseTags: true,
            autoCloseBrackets: true,
          }}
        />
        {isLoading ? (
          <Button
            variant="light"
            className="runButton"
            onClick={submit}
            disabled
          >
            Loading <BsClock />
          </Button>
        ) : (
          <Button variant="light" className="runButton" onClick={submit}>
            Run Code <VscRocket />
          </Button>
        )}
      </div>
    </div>
  );
}
