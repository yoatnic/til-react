import React from "react";
import Header from "./molecules/Header";
import Wannatags from "./molecules/Wannatags";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Wannatags {...this.props} />
      </React.Fragment>
    );
  }
}

export default App;
