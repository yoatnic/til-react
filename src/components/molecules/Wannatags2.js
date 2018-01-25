import React from "react";
import Wannatag from "../atom/Wannatag2";

const style = {
  width: "100%"
};

class Wannatags extends React.Component {
  constructor() {
    super();
    this.state = {
      wannatagHeights: [],
      rails: [],
      childWidth: 250
    };
  }

  componentWillMount() {
    this.setState({ rails: this.getRails() });
  }

  componentDidMount() {
    window.onresize = () => {
      this.setState({ rails: this.getRails() });
    };
  }

  getRails() {
    const cols = Math.floor(window.innerWidth / 270);
    const rails = [];
    for (let i = 0; i < cols; i++) {
      rails.push({ height: 0, itemCount: 0 });
    }
    return rails;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextState.wannatagHeights.length > 0 &&
      nextState.wannatagHeights.length < this.state.wannatagHeights.length
    ) {
      return false;
    }
    return true;
  }

  pushHeight(key, height) {
    this.setState(prevState => {
      const wannatagHeights = [...prevState.wannatagHeights, { height, key }];
      wannatagHeights.sort((item1, item2) => item1.key - item2.key);
      return Object.assign({}, prevState, { wannatagHeights });
    });
  }

  minIndex(rails) {
    let dst = 0;
    for (let i = 1, minHeihgt = rails[0].height; i < rails.length; i++) {
      if (minHeihgt > rails[i].height) {
        minHeihgt = rails[i].height;
        dst = i;
      }
    }
    return dst;
  }

  calculateChildTranslate(rails, i) {
    const height = this.state.wannatagHeights[i].height;
    const col = this.minIndex(rails, height);
    const mergin = 10;
    const translate = {
      x: this.state.childWidth * col + mergin * col + 10,
      y: rails[col].height + mergin * rails[col].itemCount + 10
    };
    rails[col].height += height;
    rails[col].itemCount++;
    return translate;
  }

  render() {
    const rails = this.getRails();
    const wannatags = this.props.wannatags.map((wannatag, i) => {
      let translate = null;
      if (this.state.wannatagHeights.length === this.props.wannatags.length) {
        translate = this.calculateChildTranslate(rails, i);
      }

      const props = Object.assign(
        {
          onResetWannatagDate: this.props.onResetWannatagDate,
          heightRef: this.pushHeight.bind(this, i),
          translate: translate,
          width: this.state.childWidth
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
