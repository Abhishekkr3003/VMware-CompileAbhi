const structureReducer = (state = [], action) => {
  switch (action.type) {
    case "SETSTRUCTURE":
      return action.payload;
    default:
      return state;
  }
};

export default structureReducer;
