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

  async getWannatags(shownItemDate) {
    try {
      const r = await fetch(`/wannatags/${shownItemDate}`);
      this.setState({
        wannatags: this.state.wannatags.concat(await r.json())
      });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.getWannatags(this.props.shownItemDate);
  }

  componentWillReceiveProps(nextProps) {
    this.getWannatags(nextProps.shownItemDate);
  }

  render() {
    const wannatags = this.state.wannatags.map((wannatag, i) => {
      let props = wannatag;
      if (i === this.state.wannatags.length - 1) {
        props = Object.assign({}, wannatag, {
          onEnterWindow: this.props.onEnterWindow
        });
      }
      return <Wannatag key={props.wannatagId} {...props} />;
    });
    return <div style={style}>{wannatags}</div>;
  }
}

export default Wannatags;
