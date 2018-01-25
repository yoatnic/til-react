import React from "react";
import Header from "../molecules/Header";
import WannatagRequestFactory from "../enhancements/WannatagReuests2";
import Wannatags from "../molecules/Wannatags2";
import WannatagPostForm from "../atom/WannatagPostForm";

const WrappedWannatag = WannatagRequestFactory(Wannatags);

class Sandbox extends React.Component {
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

export default Sandbox;
