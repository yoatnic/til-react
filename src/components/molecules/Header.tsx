import * as React from "react";
import {
  Alignment,
  Navbar,
  Button,
  Icon,
  Intent,
  Colors
} from "@blueprintjs/core";
import { Example } from "@blueprintjs/docs-theme";
import Login from "../atom/Login";
import Logout from "../atom/Logout";

const Header = function(props: { onToggleWannaPosting: Function }) {
  const openPostForm = function() {
    props.onToggleWannaPosting(true);
  };
  return (
    <header>
      <Navbar style={{ color: Colors.WHITE, background: Colors.GREEN2 }}>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Wanna</Navbar.Heading>
          <Navbar.Divider />
          <Button
            style={{ color: Colors.WHITE, background: Colors.GREEN2 }}
            className="bp3-minimal"
          >
            <Icon icon="home" style={{ color: Colors.WHITE }} />
            <span> Home</span>
          </Button>
          <Navbar.Divider />
          <Button
            style={{ color: Colors.WHITE, background: Colors.GREEN2 }}
            className="bp3-minimal"
            onClick={openPostForm}
          >
            <Icon icon="plus" style={{ color: Colors.WHITE }} />
            <span> Post</span>
          </Button>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Button
            style={{ color: Colors.WHITE, background: Colors.GREEN2 }}
            className="bp3-minimal"
          >
            <Icon icon="log-in" style={{ color: Colors.WHITE }} />
            <span> Login</span>
          </Button>
        </Navbar.Group>
      </Navbar>
    </header>
  );
};

export default Header;
