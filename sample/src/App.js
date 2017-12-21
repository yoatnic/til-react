import React from "react";
import Header from "./Header";
import Greet from "./Greet";

const appStyles = {
  textAlign: "center"
};

class App extends React.Component {
  render() {
    return (
      <div style={appStyles}>
        <Header />
        <Greet message="Hello!" />
      </div>
    );
  }
}

export default App;
