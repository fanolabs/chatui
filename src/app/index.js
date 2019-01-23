import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import "./style/index.less";

import { store, audio } from "./core";
import { App } from "./containers";

store.init();
audio.init();

render(
  (<Provider store={store.getStore()}>
    <App/>
  </Provider>), 
  document.getElementById("appContainer")
)