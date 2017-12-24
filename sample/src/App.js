import React from "react";
import Header from "./molecules/Header";
import Wannas from "./molecules/Wannas";

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
