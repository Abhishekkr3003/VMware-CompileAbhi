const outputReducer = (state = {}, action) => {
  switch (action.type) {
    case "SETOUTPUT":
      return action.payload;
    default:
      return state;
  }
};

export default outputReducer;
