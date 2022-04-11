// input and output

import React, { useState, useEffect } from "react";

import "../styles/io.css";
import { Button, Form } from "react-bootstrap";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { BiTimer } from "react-icons/bi";
import { VscOutput } from "react-icons/vsc";
import { setInputRedux } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";

export default function IO() {
  const [collapsed, setCollapsed] = useState(false);
  const [input, setInput] = useState("");

  const output = useSelector((state) => state.output);
  const persistInput = useSelector((state) => state.input);

  useEffect(() => {
    setInput(persistInput);
  }, []);

  console.log(output);

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
        <h1 className="dirFirstDivHeading">Input/Output</h1>
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
          {output.Success != undefined &&
            (output.Success ? (
              <p className="success">{output.Output}</p>
            ) : (
              <div className="error-div">
                <p className="error">{output.Error}</p>
                <div>
                  <Button variant="outline-light">
                    <a href={`http://google.com/`} target="_blank">
                      <FcGoogle />
                    </a>
                  </Button>
                </div>
              </div>
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
          {output.Success != undefined &&
            (output.Success ? (
              <h1 className="timeUsed">{output.Time}ms</h1>
            ) : (
              <b>
                <p className="error">{output.Type}</p>
              </b>
            ))}
        </div>
      </div>
    </div>
  );
}
