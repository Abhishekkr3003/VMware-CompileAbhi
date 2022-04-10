const codeReducer = (state = "", action) => {
  switch (action.type) {
    case "SETCODE":
      return action.payload;
    default:
      return state;
  }
};

export default codeReducer;
