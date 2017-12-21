import React from "react";
import logo from "./logo.svg";
import "./Header.css";

const logoStyles = {
  animation: "App-logo-spin infinite 20s linear",
  height: "80px"
};
const headerStyles = {
  backgroundColor: "#222",
  height: "150px",
  padding: "20px",
  color: "white"
};
const titleStyles = {
  fontSize: "1.5em"
};

const Header = function() {
  return (
    <header style={headerStyles}>
      <img src={logo} alt="logo" style={logoStyles} />
      <h1 style={titleStyles}>Welcome to React</h1>
    </header>
  );
};

export default Header;
