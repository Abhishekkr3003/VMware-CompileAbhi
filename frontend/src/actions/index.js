export const setStructure = (structure) => {
  return {
    type: "SETSTRUCTURE",
    payload: structure,
  };
};

export const updateStructure = (payload) => {
  return {
    type: "UPDATESTRUCTURE",
    payload: payload,
  };
};

export const createStructure = (payload) => {
  return {
    type: "CREATESTRUCTURE",
    payload: payload,
  };
};

export const deleteStructure = (payload) => {
  return {
    type: "DELETESTRUCTURE",
    payload: payload,
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

export const deletOpenFiles = (itemId) => {
  return {
    type: "DELETEOPENFILES",
    payload: itemId,
  };
};
