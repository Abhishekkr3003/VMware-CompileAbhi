const outputReducer = (state = [], action) => {
  switch (action.type) {
    case "ADDOPENFILES":
      for (var i = 0; i < state.length; i++) {
        if (state[i].id == action.payload.id) return state;
      }
      return [...state, action.payload];
    case "DELETEOPENFILES":
      const itemId = action.payload;
      return state.filter((element) => element.id !== itemId);
    case "EDITOPENFILECODE":
      itemId = action.payload.itemId;
      let index2 = state.findIndex((file) => file.id === itemId);
      const newArray2 = [...state];
      newArray2[index2].code = action.payload.code;
      return newArray2;
    case "RENAMEOPENFILE":
      itemId = action.payload.itemId;
      // sessionStorage.setItem("action", JSON.stringify(action.payload));
      // let index = state.findIndex((file) => file.id === itemId);
      // if (index == -1) return state;
      // const newArray = [...state];
      // newArray[index].name = action.payload.name;
      // return newArray;
      return state;
    default:
      return state;
  }
};

export default outputReducer;
