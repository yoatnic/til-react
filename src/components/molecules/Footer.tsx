import * as React from "react";
import { Alignment, Navbar, Button, Colors } from "@blueprintjs/core";

const Footer = function() {
  const style = {
    position: "fixed",
    bottom: 0,
    color: Colors.WHITE,
    background: Colors.GREEN2
  };
  return (
    <Navbar style={style}>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button
          style={{ color: Colors.WHITE, background: Colors.GREEN2 }}
          className="bp3-minimal"
        >
          Privacy & Policy
        </Button>
      </Navbar.Group>
    </Navbar>
  );
};

export default Footer;
