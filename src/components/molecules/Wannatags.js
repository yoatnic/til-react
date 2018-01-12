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
      const props = Object.assign(
        {
          onResetWannatagDate: this.props.onResetWannatagDate
        },
        wannatag
      );
      if (i === 0) {
        Object.assign(props, {
          onUpdateFirstWannatagDate: this.props.onUpdateFirstWannatagDate
        });
      }
      if (i === this.props.wannatags.length - 1) {
        Object.assign(props, {
          onUpdateLastWannatagDate: this.props.onUpdateLastWannatagDate
        });
      }
      return <Wannatag key={props.wannatagId} {...props} />;
    });
    return <div style={style}>{wannatags}</div>;
  }
}

export default Wannatags;
