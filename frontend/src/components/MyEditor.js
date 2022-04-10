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
} from "../actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BsClock, BsFillFileEarmarkCodeFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

export default function MyEditor() {
  const [code, setCode] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [dummy, setDummy] = useState(true);
  const [currentFile, setCurrentFile] = useState({});

  const input = useSelector((state) => state.input);
  const persistCode = useSelector((state) => state.code);
  const openFiles = useSelector((state) => state.openFiles);

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
    const response = await axios.post("http://3.108.190.41/test", data);
    setLoading(false);
    dispatch(setOutputRedux(response.data));
  };

  const onRemoveFile = (id) => {
    dispatch(deleteOpenFiles(id));
    setDummy(!dummy);
  };

  if (openFiles.length === 0) {
    return (
      <div className="editor">
        <div className="editorFilesOpened"></div>
        <div className="editFile noFile">
          <h1 className="noFileHeading">
            Click a file to edit <BsFillFileEarmarkCodeFill />
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="editor">
      <div className="editorFilesOpened">
        {openFiles.map((file) => {
          return (
            <div key={file.id} className="fileBarActionDiv">
              <Button
                className="fileNameButton"
                variant="outline-dark"
                onClick={() => {
                  //console.log(file);
                  setCurrentFile(file);
                  //console.log(currentFile);
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
          );
        })}
      </div>
      <div className="editFile">
        <Editor
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
        />
        {isLoading ? (
          <Button
            variant="dark"
            className="runButton"
            onClick={submit}
            disabled
          >
            Loading <BsClock />
          </Button>
        ) : (
          <Button variant="dark" className="runButton" onClick={submit}>
            Run Code <VscRocket />
          </Button>
        )}
      </div>
    </div>
  );
}
