import React from "react";
import { AiOutlineFile, AiOutlineDelete } from "react-icons/ai";
import { CgRename } from "react-icons/cg";
import { SiCplusplus, SiPython, SiC } from "react-icons/si";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setStructure, deleteStructure } from "../actions/index";

import "../styles/file.css";

export default function File({ name, id }) {
  const ICONS = {
    c: <SiC />,
    cpp: <SiCplusplus />,
    py: <SiPython />,
  };

  const dispatch = useDispatch();
  const structure = useSelector((state) => state.structure);

  const onUpdate = (event) => {};

  const onDelete = (event) => {
    var payload = { itemId: id, structure: structure };
    dispatch(deleteStructure(payload));
  };

  var ext = name.split(".")[1];

  return (
    <div className="fileActionDiv">
      <div className="fileDiv">
        {ICONS[ext] || <AiOutlineFile />}
        <span> {name}</span>
      </div>
      <div>
        <Button
          variant="outline-dark"
          size="sm"
          className="dirFirstDivButton"
          onClick={(event) => {
            onDelete(event);
          }}
        >
          <AiOutlineDelete />
        </Button>
        <Button
          variant="outline-dark"
          size="sm"
          className="dirFirstDivButton"
          onClick={(event) => {
            onUpdate(event);
          }}
        >
          <CgRename />
        </Button>
      </div>
    </div>
  );
}
