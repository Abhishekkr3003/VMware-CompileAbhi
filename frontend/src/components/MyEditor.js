// code editor

import React, { useState } from "react";
import "../styles/editor.css";
import { Form, Button } from "react-bootstrap";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import { VscRocket } from "react-icons/vsc";

export default function MyEditor() {
  const [code, setCode] = useState("");

  const onChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <div className="editor">
      <div className="editorFilesOpened"></div>
      <div className="editFile">
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          tabSize={4}
          style={{
            fontSize: "1rem",
            height: "100%",
          }}
        />
        <Button variant="dark" className="runButton">
          Run Code <VscRocket />
        </Button>
      </div>
    </div>
  );
}
