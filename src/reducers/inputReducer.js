const inputReducer = (state = "", action) => {
  switch (action.type) {
    case "SETINPUT":
      return action.payload;
    default:
      return state;
  }
};

export default inputReducer;
