import React, { useState } from "react";
import {
  AiOutlineFile,
  AiOutlineDelete,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { CgRename } from "react-icons/cg";
import { SiCplusplus, SiPython, SiC } from "react-icons/si";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addOpenFiles, setCodeRedux, openFile } from "../actions/index";

import "../styles/file.css";

export default function File({ file, name, id, onDelete, onRename }) {
  const [takeInput, setTakeInput] = useState(false);
  const [newItem, setNewItem] = useState("");

  const onChangeName = (event) => {
    setNewItem(event.target.value);
  };

  const submit = (event) => {
    onRename(id, newItem, file);
    setTakeInput(!takeInput);
    event.stopPropogation();
  };

  const fileClick = () => {
    dispatch(addOpenFiles(file));
    dispatch(setCodeRedux(file.code));
    dispatch(openFile(id));
  };

  const ICONS = {
    c: <SiC />,
    cpp: <SiCplusplus />,
    py: <SiPython />,
  };

  const dispatch = useDispatch();

  var ext = name.split(".")[1];

  //var ext = 0;

  return (
    <div>
      <div className="fileActionDiv">
        <div className="fileDiv">
          {ICONS[ext] || <AiOutlineFile />}
          <span onClick={() => fileClick()}> {name}</span>
        </div>
        <div>
          <Button
            variant="outline-dark"
            size="sm"
            className="dirFirstDivButton"
            onClick={() => {
              onDelete(id);
            }}
          >
            <AiOutlineDelete />
          </Button>
          <Button
            variant="outline-dark"
            size="sm"
            className="dirFirstDivButton"
            onClick={() => setTakeInput(!takeInput)}
          >
            <CgRename />
          </Button>
        </div>
      </div>
      {takeInput && (
        <Form className="folderForm">
          <Form.Control
            type="input"
            value={newItem}
            onChange={onChangeName}
            name="name"
            placeholder="Name.."
          />
          <Button
            size="sm"
            variant="dark"
            onClick={(event) => submit(event)}
            type="submit"
            className="folderFormButton"
          >
            <AiOutlinePlusCircle />
          </Button>
        </Form>
      )}
    </div>
  );
}
