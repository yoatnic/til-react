import React from "react";
import Login from "../atom/Login";
import Logout from "../atom/Logout";

const Header = function() {
  return (
    <header>
      <h1>header</h1>
      <Login />
      <Logout />
    </header>
  );
};

export default Header;
