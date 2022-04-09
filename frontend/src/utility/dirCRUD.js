import { useSelector, useDispatch } from "react-redux";
import { setStructure } from "../actions/index";

const dispatch = useDispatch();

const createHelper = (type, name, folderID, struct) => {
  structure.map((item) => {
    if (item.type == "folder") {
      if (item.id == folderID) {
        let nf;
        if (type == "file") {
          nf = {
            type: type,
            name: name,
          };
        } else {
          nf = {
            type: type,
            name: name,
            childrens: [],
          };
        }
        item.childrens.push(nf);
        return;
      } else {
        if (item.childrens.length != 0) {
          createHelper(type, name, folderID, item.childrens);
        }
      }
    }
  });

  return;
};

export const create = (type, name, folderID) => {
  var structure = useSelector((state) => state.structure);
  createHelper(type, name, folderID, structure);
  dispatch(setStructure(structure));
};
