import { combineReducers } from "redux";

import auth from "./auth";
import chat from "./chat";


const reducers = combineReducers({
  auth, chat
});

export default reducers