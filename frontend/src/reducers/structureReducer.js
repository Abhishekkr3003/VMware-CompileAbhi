const structureReducer = (state = [], action) => {
  switch (action.type) {
    case "SETSTRUCTURE":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default structureReducer;
