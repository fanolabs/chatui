import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import { createLogger } from "redux-logger";
import thunkMiddleware from 'redux-thunk';

import reducers from "../reducers";

const store = {

  init() {
    const loggerMiddleware = createLogger();
    this.store = createStore(
      reducers,
      compose(
        applyMiddleware(
          thunkMiddleware,
          loggerMiddleware
        )
      )
    )
  },

  getStore() {
    return this.store;
  }

}

export default store;