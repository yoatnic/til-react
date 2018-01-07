import React from "react";
import Wannatag from "../atom/Wannatag";

const style = {
  display: "flex",
  flexWrap: "wrap",
  width: "100%"
};

class Wannatags extends React.Component {
  render() {
    const wannatags = this.props.wannatags.map((wannatag, i) => {
      let props = wannatag;
      if (i === this.props.wannatags.length - 1) {
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
