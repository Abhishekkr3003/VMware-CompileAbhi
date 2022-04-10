// input and output

import React, { useState } from "react";

import "../styles/io.css";
import { Button, Form } from "react-bootstrap";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { BiTimer } from "react-icons/bi";
import { VscOutput } from "react-icons/vsc";
import { setInputRedux } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function IO() {
  const [collapsed, setCollapsed] = useState(false);
  const [input, setInput] = useState("");

  const output = useSelector((state) => state.output);

  const dispatch = useDispatch();

  const onChange = (event) => {
    setInput(event.target.value);
    dispatch(setInputRedux(event.target.value));
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
        <div className="outputHeading">
          Output <VscOutput />
        </div>
        <div className="outputContent">
          {output.Output != undefined &&
            (output.Success ? (
              <p className="success">{output.Output}</p>
            ) : (
              <p className="error">output.Output</p>
            ))}
        </div>
      </div>
      <div className="spaceTime">
        <div className="spaceTimeHeading">
          Time Used{" "}
          <span style={{ fontSize: "1.3rem" }}>
            <BiTimer />
          </span>
        </div>
        <div className="spaceTimeContent">
          {output.Output != undefined && (
            <h1 className="timeUsed">{output.Time}</h1>
          )}
        </div>
      </div>
    </div>
  );
}
