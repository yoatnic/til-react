import React from "react";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./atom/Login";

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" render={() => <App {...this.props} />} />
          {/* <Route path="/signup" component={Login} /> */}
          {/* <Route path="/login" component={} />
        <Route path="/logout" component={} />
        <Route path="/leave" component={} /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
