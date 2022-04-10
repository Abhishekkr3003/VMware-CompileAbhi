// code director file structure

import React, { useEffect, useState } from "react";
import "../styles/directory.css";
import { Button } from "react-bootstrap";
import Tree from "./Tree";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function Directory() {
  const [collapsed, setCollapsed] = useState(false);

  const structure = useSelector((state) => state.structure);

  useEffect(() => {}, [structure]);

  console.log(structure);

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
        <h1 className="dirFirstDivHeading">My Folder</h1>
        <div>
          {/* <Button
            variant="outline-dark"
            size="sm"
            className="dirFirstDivButton"
          >
            <AiFillFileAdd />
          </Button>
          <Button
            variant="outline-dark"
            size="sm"
            className="dirFirstDivButton"
          >
            <AiFillFolderAdd />
          </Button> */}
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
        <Tree structure={structure} />
      </div>
    </div>
  );
}
