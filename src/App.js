import React from "react";
import Header from "./components/molecules/Header";
import WannatagRequestFactory from "./components/enhancements/WannatagReuests";
import Wannatags from "./components/molecules/Wannatags";
import WannatagPostForm from "./components/atom/WannatagPostForm";

const WrappedWannatag = WannatagRequestFactory(Wannatags);

class App extends React.Component {
  render() {
    const wannatagProps = {
      shownItemDate: this.props.shownItemDate,
      firstItemDate: this.props.firstItemDate
    };
    const headerProps = {
      onStartWanna: this.props.onStartWanna
    };
    return (
      <React.Fragment>
        <Header {...headerProps} />
        <WrappedWannatag {...wannatagProps} />
        {this.props.isStartedWanna ? <WannatagPostForm /> : null}
      </React.Fragment>
    );
  }
}

export default App;
