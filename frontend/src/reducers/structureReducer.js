import { create, update, dlte } from "../utility/dirCRUD";
import axios from "axios";
import { nanoid } from "nanoid";

const structureReducer = (state = [], action) => {
  switch (action.type) {
    case "SETSTRUCTURE":
      return action.payload;
    case "DELETEFILE":
      var itemId = action.payload.itemId;
      return state.filter((element) => element.id !== itemId);
    case "RENAMEFILE":
      itemId = action.payload.itemId;
      let index = state.findIndex((file) => file.id === itemId);
      const newArray = [...state];
      newArray[index].name = action.payload.name;
      return newArray;
    case "ADDFILE":
      var newFile = {
        name: action.payload.name,
        type: "file",
        code: action.payload.code,
        id: action.payload.id,
      };
      return [...state, newFile];
    case "EDITFILECODE":
      itemId = action.payload.itemId;
      let index2 = state.findIndex((file) => file.id === itemId);
      const newArray2 = [...state];
      newArray2[index2].code = action.payload.code;
      return newArray2;
    default:
      return state;
  }
};

export default structureReducer;
