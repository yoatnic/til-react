import React from "react";
import Login from "../atom/Login";
import Logout from "../atom/Logout";
import WannatagPostButton from "../atom/WannatagPostButton";

const Header = function(props) {
  return (
    <header>
      <h1>header</h1>
      <Login />
      <Logout />
      <WannatagPostButton {...props} />
    </header>
  );
};

export default Header;
