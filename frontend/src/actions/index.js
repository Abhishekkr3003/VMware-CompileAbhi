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
