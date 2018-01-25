import React from "react";
import Home from "./components/pages/Home";
import Sandbox from "./components/pages/Sandbox";
// import GridLayoutSandbox from "./components/pages/GridLayoutSandbox";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/atom/Login";

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" render={() => <Home {...this.props} />} />
          <Route
            exact
            path="/grid-layout-sandbox"
            render={() => <Sandbox {...this.props} />}
          />
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
