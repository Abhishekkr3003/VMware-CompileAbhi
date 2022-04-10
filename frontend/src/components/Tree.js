import React, { useState } from "react";
import File from "./File";
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
import {
  addFile,
  deleteFile,
  renameFile,
  deleteOpenFiles,
  renameOpenFile,
} from "../actions/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { nanoid } from "nanoid";

export default function Tree() {
  const [collapsed, setCollapsed] = useState(false);
  const [takeInput, setTakeInput] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [dummy, setDummy] = useState(true);

  const dispatch = useDispatch();

  const structure = useSelector((state) => state.structure);
  const user = useSelector((state) => state.user);

  const onChangeName = (event) => {
    setNewItem(event.target.value);
  };

  const submit = async (event) => {
    if (newItem != "") {
      var payload = {
        type: "file",
        name: newItem,
        code: "",
        id: nanoid(),
        userId: undefined,
      };
      dispatch(addFile(payload));

      if (user.userId != undefined) {
        payload.userId = user.userId;
        await axios.post("http://3.108.190.41/add-file", payload);
      }
    } else {
      toast.error("File Name Cannot Be Empty!");
    }
    setTakeInput(false);
    event.preventDefault();
  };

  const onDelete = (id) => {
    var payload = { itemId: id };
    dispatch(deleteFile(payload));
    dispatch(deleteOpenFiles(id));
    setDummy(!dummy);
  };

  const onRename = (id, name) => {
    var payload = { itemId: id, name: name };
    dispatch(renameFile(payload));
    dispatch(renameOpenFile(payload));
    setDummy(!dummy);
  };

  return (
    <div>
      <div className="folderActionDiv">
        <div>
          <AiOutlineFolder />
          <span>root</span>
        </div>
        <div>
          <Button
            variant="outline-dark"
            size="sm"
            className="dirFirstDivButton"
            onClick={() => setTakeInput(!takeInput)}
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
      <div className="folderChildren">
        {!collapsed &&
          structure.map((item) => {
            return (
              <File
                file={item}
                key={item.id}
                name={item.name}
                id={item.id}
                onDelete={onDelete}
                onRename={onRename}
              />
            );
          })}
        <ToastContainer />
      </div>
    </div>
  );
}
