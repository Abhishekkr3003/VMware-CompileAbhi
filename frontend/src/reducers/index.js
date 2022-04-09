import { combineReducers } from "redux";
import structureReducer from "./structureReducer";
import useReducer from "./userReducer";

const rootReducer = combineReducers({
  structure: structureReducer,
  user: useReducer,
});

export default rootReducer;
