import React from "react";
import { Alignment, Navbar, Button } from "@blueprintjs/core";
import { Example } from "@blueprintjs/docs-theme";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/docs-theme/lib/css/docs-theme.css";
import Login from "../atom/Login";
import Logout from "../atom/Logout";

const Header = function(props) {
  const openPostForm = function() {
    props.onToggleWannaPosting(true);
  };
  return (
    <header>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Wanna</Navbar.Heading>
          <Navbar.Divider />
          <Button className="bp3-minimal" icon="home" text="Home" />
          <Navbar.Divider />
          <Button
            className="bp3-minimal"
            icon="plus"
            text="Post"
            onClick={openPostForm}
          />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Button className="bp3-minimal" icon="log-in" text="Login" />
        </Navbar.Group>
      </Navbar>
    </header>
  );
};

export default Header;
