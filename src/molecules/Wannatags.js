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
    this.fetching = false;
  }

  async getWannatags() {
    this.fetching = true;
    try {
      const r = await fetch(`/wannatags/${this.props.shownItemDate}`);
      this.setState({
        wannatags: this.state.wannatags.concat(await r.json())
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.fetching = false;
    }
  }

  render() {
    if (!this.fetching) this.getWannatags();
    const wannatags = this.state.wannatags.map((wannatag, i) => {
      let props = wannatag;
      if (i === this.state.wannatags.length - 1) {
        props = Object.assign({}, wannatag, {
          onEnterWindow: this.props.onEnterWindow
        });
      }
      console.log(props.wannatagId);
      return <Wannatag key={props.wannatagId} {...props} />;
    });
    return <div style={style}>{wannatags}</div>;
  }
}

export default Wannatags;
