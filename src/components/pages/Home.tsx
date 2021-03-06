import * as React from "react";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import WannatagRequestFactory from "../enhancements/WannatagReuests";
import Wannatags from "../molecules/Wannatags";
import WannatagPostForm from "../atom/WannatagPostForm";

const WrappedWannatag = WannatagRequestFactory(Wannatags);

interface Props {
  isWannaPosting: boolean;
  lastWannatagDate: number;
  firstWannatagDate: number;
  onUpdateLastWannatagDate: Function;
  onUpdateFirstWannatagDate: Function;
  onResetWannatagDate: Function;
  onToggleWannaPosting: Function;
}

class Home extends React.Component<Props> {
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
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
