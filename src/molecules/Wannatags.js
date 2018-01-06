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

  polling() {
    setInterval(async () => {
      const wannatags = await this.getWannatags(0);
      const current = this.state.wannatags.slice(0, 20);
      const diff = wannatags.filter(w => {
        const i = current.findIndex(wt => {
          return w.wannatagId === wt.wannatagId;
        });
        return i < 0;
      });
      if (diff.length > 0) {
        this.setState(prevState => {
          return {
            wannatags: diff.concat(prevState.wannatags)
          };
        });
      }
    }, 5000);
  }

  async getWannatags(shownItemDate) {
    const r = await fetch(`/wannatags/${shownItemDate}`);
    return await r.json();
  }

  async updateWannatags(shownItemDate) {
    try {
      const wannatags = await this.getWannatags(shownItemDate);
      this.setState(prevState => {
        return {
          wannatags: prevState.wannatags.concat(wannatags)
        };
      });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.updateWannatags(this.props.shownItemDate);
    this.polling();
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
