// input and output

import React, { useState } from "react";

import "../styles/io.css";
import { Button, Form } from "react-bootstrap";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

export default function IO() {
  const [collapsed, setCollapsed] = useState(false);
  const [input, setInput] = useState("");

  const onChange = (event) => {
    setInput(event.target.value);
  };

  if (collapsed) {
    return (
      <Button
        variant="dark"
        className="directoryCollapsedButton"
        onClick={() => setCollapsed(false)}
      >
        <AiOutlineDoubleLeft />
      </Button>
    );
  }

  return (
    <div className="io">
      <div className="ioFirstDiv">
        <div>
          <Button
            variant="outline-dark"
            size="sm"
            className="dirFirstDivButton"
            onClick={() => setCollapsed(true)}
          >
            <AiOutlineDoubleRight />
          </Button>
        </div>
        <h1 className="dirFirstDivHeading">I/O</h1>
      </div>
      <div className="input">
        <Form.Control
          as="textarea"
          rows="11"
          value={input}
          onChange={onChange}
          name="input"
          placeholder="Enter Your Input Here"
          className="ioInput"
        />
      </div>
      <div className="output">
        <div className="outputHeading">Output</div>
      </div>
      <div className="spaceTime">
        <div className="spaceTimeHeading">Time Used</div>
      </div>
    </div>
  );
}
