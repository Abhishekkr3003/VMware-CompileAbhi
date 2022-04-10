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
import {
  setStructure,
  deleteStructure,
  updateStructure,
  createStructure,
} from "../actions/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Folder({ name, id, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [takeInput, setTakeInput] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    type: "",
  });
  const [childs, setChilds] = useState([]);

  useEffect(() => {
    setChilds([children]);
  }, [children]);

  const dispatch = useDispatch();
  const structure = useSelector((state) => state.structure);

  const createNewFile = () => {
    updateType("file");
    setTakeInput(!takeInput);
  };

  const createNewFolder = () => {
    updateType("folder");
    setTakeInput(!takeInput);
  };

  const onChangeName = (event) => {
    const { name, value } = event.target;
    setNewItem((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
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
        type: newItem.type,
        name: newItem.name,
        folderId: id,
        structure: structure,
      };
      dispatch(createStructure(payload));
    } else {
      toast.error("Name Cannot Be Empty!");
    }
  };

  const onDelete = (event) => {
    if (id == "root") {
      toast.error("This folder cannot be deleted");
    } else {
      var payload = { itemId: id, structure: structure };
      dispatch(deleteStructure(payload));
    }
    //event.preventDefault();
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
            onClick={(event) => {
              createNewFolder(event);
            }}
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
      {!collapsed && <div className="folderChildren">{childs}</div>}
      <ToastContainer />
    </div>
  );
}
