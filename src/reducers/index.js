import { combineReducers } from "redux";
import structureReducer from "./structureReducer";
import useReducer from "./userReducer";
import codeReducer from "./codeReducer";
import inputReducer from "./inputReducer";
import outputReducer from "./outputReducer";
import openFilesReducer from "./openFilesReducer";

const rootReducer = combineReducers({
  structure: structureReducer,
  user: useReducer,
  code: codeReducer,
  input: inputReducer,
  output: outputReducer,
  openFiles: openFilesReducer,
});

export default rootReducer;
