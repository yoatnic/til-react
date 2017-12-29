import React from "react";
import Wannatag from "../atom/Wannatag";

class Wannatags extends React.Component {
  constructor() {
    super();
    this.state = {
      wannatags: []
    };
  }

  componentDidMount() {
    return fetch("/wannatags")
      .then(res => res.json())
      .then(wannatags => {
        this.setState({ wannatags });
      });
  }

  render() {
    const wannatags = this.state.wannatags.map(wannatag => (
      <Wanna {...wannatag} />
    ));
    return <React.Fragment>{wannatags}</React.Fragment>;
  }
}

export default Wannatags;
