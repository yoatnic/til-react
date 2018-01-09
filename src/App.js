import React from "react";
import Header from "./components/molecules/Header";
import WannatagRequestFactory from "./components/enhancements/WannatagReuests";
import Wannatags from "./components/molecules/Wannatags";

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
