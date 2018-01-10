import "intersection-observer";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppContainer from "./containers/AppContainer";
import { store } from "./stores/Store";

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementsByClassName("main")[0]
);
