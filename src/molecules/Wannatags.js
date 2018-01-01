import React from "react";
import Wannatag from "../atom/Wannatag";

const style = {
  display: "flex",
  flexWrap: "wrap",
  width: "100%"
};

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
    return <div style={style}>{wannatags}</div>;
  }
}

export default Wannatags;
