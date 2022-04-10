import React, { useState, useEffect } from "react";
import "../styles/folder.css";
import {
  AiOutlineFolder,
  AiOutlineFileAdd,
  AiOutlineFolderAdd,
  AiOutlinePlusCircle,
  AiOutlineDelete,
} from "react-icons/ai";
import { VscCollapseAll } from "react-icons/vsc";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addFile } from "../actions/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Folder({ name, id, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [takeInput, setTakeInput] = useState(false);
  const [newItem, setNewItem] = useState("");

  const dispatch = useDispatch();
  const structure = useSelector((state) => state.structure);

  const createNewFile = () => {
    setTakeInput(!takeInput);
  };

  const onChangeName = (event) => {
    setNewItem(event.target.value);
  };

  const updateType = (type) => {
    setNewItem((prevValue) => {
      return {
        ...prevValue,
        type: type,
      };
    });
  };

  const submit = (event) => {
    if (newItem.name != "") {
      var payload = {
        type: "file",
        name: newItem.name,
      };
      dispatch(addFile(payload));
    } else {
      toast.error("File Name Cannot Be Empty!");
    }
  };

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
            onClick={(event) => {
              createNewFile(event);
            }}
          >
            <AiOutlineFileAdd />
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
      {takeInput && (
        <Form className="folderForm">
          <Form.Control
            type="input"
            value={newItem.name}
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
      {!collapsed && <div className="folderChildren">{children}</div>}
      <ToastContainer />
    </div>
  );
}
