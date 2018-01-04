import "intersection-observer";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppContainer from "./containers/AppContainer";
import { wannatagStore } from "./stores/wannatag";

ReactDOM.render(
  <Provider store={wannatagStore}>
    <AppContainer />
  </Provider>,
  document.getElementsByClassName("main")[0]
);
