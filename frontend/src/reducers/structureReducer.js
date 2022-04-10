import { create, update, dlte } from "../utility/dirCRUD";
import axios from "axios";

const structureReducer = (state = [], action) => {
  switch (action.type) {
    case "SETSTRUCTURE":
      return action.payload;
    case "DELETESTRUCTURE":
      var structure = action.payload.structure;
      var itemId = action.payload.itemId;
      var newStructure = dlte(structure, itemId);
      return newStructure;
    case "UPDATESTRUCTURE":
      var structure = action.payload.structure;
      var itemId = action.payload.itemId;
      var name = action.payload.name;
      var newStructure = update(name, itemId, structure);
      return newStructure;
    case "CREATESTRUCTURE":
      var structure = action.payload.structure;
      var folderId = action.payload.folderId;
      var type = action.payload.type;
      var name = action.payload.name;
      console.log("createStructureTriggered");
      var newStructure = create(type, name, folderId, structure);
      return newStructure;
    default:
      return state;
  }
};

export default structureReducer;
