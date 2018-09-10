import * as React from "react";
import Home from "./components/pages/Home";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/atom/Login";

const makeHomeRenderer = (props: any) => () => <Home {...props} />;

const AppRouter = (props: any) => {
  return (
    <BrowserRouter>
      <div>
        <Route exact={true} path="/" render={makeHomeRenderer(props)} />
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
