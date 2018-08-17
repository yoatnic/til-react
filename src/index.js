import "intersection-observer";
import "web-animations-js/web-animations-next.min.js";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppContainer from "./containers/AppContainer";
import { store } from "./stores/Store";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/docs-theme/lib/css/docs-theme.css";

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementsByClassName("main")[0]
);
