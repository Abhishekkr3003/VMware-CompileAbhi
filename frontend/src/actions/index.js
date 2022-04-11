export const setStructure = (structure) => {
  return {
    type: "SETSTRUCTURE",
    payload: structure,
  };
};

export const addFile = (payload) => {
  return {
    type: "ADDFILE",
    payload: payload,
  };
};

export const renameFile = (payload) => {
  return {
    type: "RENAMEFILE",
    payload: payload,
  };
};

export const deleteFile = (payload) => {
  return {
    type: "DELETEFILE",
    payload: payload,
  };
};

export const editFileCode = (payload) => {
  return {
    type: "EDITFILECODE",
    payload: payload,
  };
};

export const openFile = (itemId) => {
  console.log(itemId);
  return {
    type: "OPENFILE",
    payload: itemId,
  };
};

export const closeFile = (itemId) => {
  return {
    type: "CLOSEFILE",
    payload: itemId,
  };
};

export const setUser = (user) => {
  return {
    type: "SETUSER",
    payload: user,
  };
};

export const removeUser = () => {
  return {
    type: "SETUSER",
    payload: {},
  };
};

export const setCodeRedux = (code) => {
  return {
    type: "SETCODE",
    payload: code,
  };
};

export const setInputRedux = (input) => {
  return {
    type: "SETINPUT",
    payload: input,
  };
};

export const setOutputRedux = (Output) => {
  return {
    type: "SETOUTPUT",
    payload: Output,
  };
};

export const addOpenFiles = (file) => {
  return {
    type: "ADDOPENFILES",
    payload: file,
  };
};

export const deleteOpenFiles = (itemId) => {
  return {
    type: "DELETEOPENFILES",
    payload: itemId,
  };
};

export const editOpenFileCode = (payload) => {
  return {
    type: "EDITOPENFILECODE",
    payload: payload,
  };
};

export const renameOpenFile = (payload) => {
  //console.log("action-hit");
  return {
    type: "RENAMEOPENFILE",
    payload: payload,
  };
};
