import * as React from "react";
import Home from "./components/pages/Home";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/atom/Login";

const renderHome = (props: any) => <Home {...props} />;

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={renderHome} />
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
