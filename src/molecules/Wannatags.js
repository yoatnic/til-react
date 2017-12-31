import React from "react";
import Wannatag from "../atom/Wannatag";

class Wannatags extends React.Component {
  constructor() {
    super();
    this.state = {
      wannatags: []
    };
  }

  async componentDidMount() {
    try {
      const r = await fetch("/wannatags");
      this.setState({ wannatags: await r.json() });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const wannatags = this.state.wannatags.map(wannatag => {
      return <Wannatag key={wannatag.wannatagId} {...wannatag} />;
    });
    return <React.Fragment>{wannatags}</React.Fragment>;
  }
}

export default Wannatags;
