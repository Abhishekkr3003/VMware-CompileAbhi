export const setStructure = (structure) => {
  return {
    type: "SETSTRUCTURE",
    payload: structure,
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
