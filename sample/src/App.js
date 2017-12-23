import React from "react";
import Header from "./Header";
import Wannas from "./Wannas";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Wannas />
      </React.Fragment>
    );
  }
}

export default App;
