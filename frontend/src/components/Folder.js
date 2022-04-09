import React, { useState } from "react";

import "../styles/folder.css";
import {
  AiOutlineFolder,
  AiOutlineFileAdd,
  AiOutlineFolderAdd,
} from "react-icons/ai";
import { VscCollapseAll } from "react-icons/vsc";
import { Button } from "react-bootstrap";

export default function Folder({ name, addNewFile, children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <div className="folderActionDiv">
        <div>
          <AiOutlineFolder />
          <span> {name}</span>
        </div>
        <div>
          <Button
            variant="outline-dark"
            size="sm"
            className="dirFirstDivButton"
            onClick={() => {
              addNewFile("hello.cpp");
            }}
          >
            <AiOutlineFileAdd />
          </Button>
          <Button
            variant="outline-dark"
            size="sm"
            className="dirFirstDivButton"
          >
            <AiOutlineFolderAdd />
          </Button>
          <Button
            variant="outline-dark"
            size="sm"
            className="dirFirstDivButton"
            onClick={() => setCollapsed(!collapsed)}
          >
            <VscCollapseAll />
          </Button>
        </div>
      </div>
      {!collapsed && <div className="folderChildren">{children}</div>}
    </div>
  );
}
