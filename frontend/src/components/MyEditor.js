// code editor

import React, { useState } from "react";
import "../styles/editor.css";
import { Form, Button } from "react-bootstrap";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import { VscRocket } from "react-icons/vsc";
import { setCodeRedux, setOutputRedux } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function MyEditor() {
  const [code, setCode] = useState("");

  const input = useSelector((state) => state.input);

  const dispatch = useDispatch();

  const onChange = (event) => {
    setCode(event.target.value);
    dispatch(setCodeRedux(event.target.value));
  };

  const submit = () => {
    //TODO:
    // api call;
    // dispatch setOutputRedux action
  };

  return (
    <div className="editor">
      <div className="editorFilesOpened">
        <p className="editorFilesOpenedHeading">Code Editor</p>
      </div>
      <div className="editFile">
        <Editor
          value={code}
          onValueChange={onChange}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          tabSize={4}
          style={{
            fontSize: "1rem",
            height: "100%",
          }}
        />
        <Button variant="dark" className="runButton" onSubmit={submit}>
          Run Code <VscRocket />
        </Button>
      </div>
    </div>
  );
}
