import React from "react";
import Header from "./components/molecules/Header";
import WannatagRequestFactory from "./components/enhancements/WannatagReuests";
import Wannatags from "./components/molecules/Wannatags";
import WannatagPostForm from "./components/atom/WannatagPostForm";

const WrappedWannatag = WannatagRequestFactory(Wannatags);

class App extends React.Component {
  render() {
    const wannatagProps = {
      lastWannatagDate: this.props.lastWannatagDate,
      firstWannatagDate: this.props.firstWannatagDate,
      onUpdateLastWannatagDate: this.props.onUpdateLastWannatagDate,
      onUpdateFirstWannatagDate: this.props.onUpdateFirstWannatagDate,
      onResetWannatagDate: this.props.onResetWannatagDate
    };
    const headerProps = {
      onToggleWannaPosting: this.props.onToggleWannaPosting
    };
    const formProps = {
      onToggleWannaPosting: this.props.onToggleWannaPosting,
      onResetWannatagDate: this.props.onResetWannatagDate
    };
    return (
      <React.Fragment>
        <Header {...headerProps} />
        <WrappedWannatag {...wannatagProps} />
        {this.props.isWannaPosting ? <WannatagPostForm {...formProps} /> : null}
      </React.Fragment>
    );
  }
}

export default App;
