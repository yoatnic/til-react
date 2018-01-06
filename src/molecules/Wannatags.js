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
    const r = await fetch(`/wannatags/${shownItemDate}`);
    return await r.json();
  }

  async updateWannatags(shownItemDate) {
    try {
      this.setState({
        wannatags: this.state.wannatags.concat(
          await this.getWannatags(shownItemDate)
        )
      });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.updateWannatags(this.props.shownItemDate);
  }

  componentWillReceiveProps(nextProps) {
    this.updateWannatags(nextProps.shownItemDate);
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
