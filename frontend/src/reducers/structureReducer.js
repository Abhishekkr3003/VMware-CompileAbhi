import { create, update, dlte } from "../utility/dirCRUD";
import axios from "axios";
import { nanoid } from "nanoid";

const structureReducer = (state = [], action) => {
  switch (action.type) {
    case "SETSTRUCTURE":
      console.log(action.payload);
      const newS = [...action.payload];
      return newS;
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
        isOpen: false,
      };
      return [...state, newFile];
    case "EDITFILECODE":
      itemId = action.payload.itemId;
      let index2 = state.findIndex((file) => file.id === itemId);
      const newArray2 = [...state];
      newArray2[index2].code = action.payload.code;
      return newArray2;
    case "OPENFILE":
      itemId = action.payload;
      console.log(itemId);
      let index3 = state.findIndex((file) => file.id === itemId);
      console.log(index3);
      const newArray3 = [...state];
      newArray3[index3].isOpen = true;
      return newArray3;
    case "CLOSEFILE":
      itemId = action.payload;
      let index4 = state.findIndex((file) => file.id === itemId);
      console.log(index4);
      const newArray4 = [...state];
      newArray4[index4].isOpen = false;
      return newArray4;
    default:
      return state;
  }
};

export default structureReducer;
