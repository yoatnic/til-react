import React from "react";
import Header from "./molecules/Header";
import WannatagRequestFactory from "./enhancements/WannatagReuests";
import Wannatags from "./molecules/Wannatags";

const WrappedWannatag = WannatagRequestFactory(Wannatags);

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <WrappedWannatag {...this.props} />
      </React.Fragment>
    );
  }
}

export default App;
