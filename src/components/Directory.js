// code director file structure

import React, { useEffect, useState } from "react";
import "../styles/directory.css";
import { Button } from "react-bootstrap";
import Tree from "./Tree";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { setStructure } from "../actions";

export default function Directory() {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <Button
        variant="dark"
        className="directoryCollapsedButton"
        onClick={() => setCollapsed(false)}
      >
        <AiOutlineDoubleRight />
      </Button>
    );
  }

  return (
    <div className="directory">
      <div className="dirFirstDiv">
        <h1 className="dirFirstDivHeading">Directory</h1>
        <div>
          <Button
            variant="outline-dark"
            size="sm"
            className="dirFirstDivButton"
            onClick={() => setCollapsed(true)}
          >
            <AiOutlineDoubleLeft />
          </Button>
        </div>
      </div>
      <div className="dirTree">
        <Tree />
      </div>
    </div>
  );
}
