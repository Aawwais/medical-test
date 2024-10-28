import { combineReducers } from "redux";
import authReducer from "./authReducer";
import testsReducer from "./testsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  tests: testsReducer,
});

export default rootReducer;
