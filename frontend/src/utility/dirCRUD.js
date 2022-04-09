import { nanoid } from "nanoid";

const createHelper = (type, name, folderID, structure) => {
  structure.map((item) => {
    if (item.type == "folder") {
      if (item.id == folderID) {
        let nf;
        if (type == "file") {
          nf = {
            id: nanoid(),
            type: type,
            name: name,
          };
        } else {
          nf = {
            id: nanoid(),
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

const deleteHelper = (itemId, structure) => {
  for (var item = 0; item < structure.length; item++) {
    console.log(structure[item].id);
    if (structure[item].id == itemId) {
      structure.splice(item, 1);
      return;
    } else {
      if (
        structure[item].type == "folder" &&
        structure[item].childrens.length != 0
      ) {
        deleteHelper(itemId, structure[item].childrens);
      }
    }
  }
  return;
};

const updateHelper = (name, itemId, structure) => {
  structure.map((item) => {
    if (item.id == itemId) {
      item.name = name;
      return;
    } else {
      if (item.type == "folder" && item.childrens.length != 0) {
        updateHelper(name, itemId, structure.childrens);
      }
    }
  });

  return;
};

export const create = (type, name, folderID, structure) => {
  createHelper(type, name, folderID, structure);
  return structure;
};

export const update = (name, itemId, structure) => {
  updateHelper(name, itemId, structure);
  return structure;
};

export const dlte = (itemId, structure) => {
  deleteHelper(itemId);
  localStorage.setItem("newStruct", JSON.stringify(structure[0]));
  return structure;
};
