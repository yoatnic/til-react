import React from "react";
import FragmentDate from "./FragmentDate";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      tickCount: props.initialCount
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState((prevState, props) => ({
      date: new Date(),
      tickCount: prevState.tickCount + 1
    }));
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <FragmentDate date={this.state.date} />
        <h2>{this.state.tickCount}</h2>
      </div>
    );
  }
}

export default Clock;
