const outputReducer = (state = [], action) => {
  switch (action.type) {
    case "ADDOPENFILES":
      return [...state, action.payload];
    case "DELETEOPENFILES":
      const itemId = action.payload.itemId;
      const newState = state;
      for (var i = 0; i < newState.length; i++) {
        if (newState[i].id == itemId) {
          newState.splice(i, 1);
          break;
        }
      }
      return newState;
    default:
      return state;
  }
};

export default outputReducer;
