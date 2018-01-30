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
      cols: 0,
      childWidth: 250
    };
  }

  componentWillMount() {
    this.setState({ cols: this.getColsCount() });
  }

  componentDidMount() {
    window.onresize = () => {
      this.setState({ cols: this.getColsCount() });
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.wannatags.length === 0) {
      this.setState({ wannatagHeights: [] });
    }
  }

  getColsCount() {
    return Math.floor(window.innerWidth / 270);
  }

  createCols() {
    const cols = [];
    for (let i = 0; i < this.state.cols; i++) {
      cols.push({ height: 0, itemCount: 0 });
    }
    return cols;
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
      wannatagHeights.sort((item1, item2) => item2.key - item1.key);
      return Object.assign({}, prevState, { wannatagHeights });
    });
  }

  minIndex(cols) {
    let dst = 0;
    for (let i = 1, minHeihgt = cols[0].height; i < cols.length; i++) {
      if (minHeihgt > cols[i].height) {
        minHeihgt = cols[i].height;
        dst = i;
      }
    }
    return dst;
  }

  calculateChildTranslate(cols, height) {
    const col = this.minIndex(cols, height);
    const mergin = 10;
    const translate = {
      x: this.state.childWidth * col + mergin * col + 10,
      y: cols[col].height + mergin * cols[col].itemCount + 10
    };
    cols[col].height += height;
    cols[col].itemCount++;
    return translate;
  }

  render() {
    const cols = this.createCols();
    const wannatags = this.props.wannatags.map((wannatag, i) => {
      let translate = null;
      if (this.state.wannatagHeights.length === this.props.wannatags.length) {
        const height = this.state.wannatagHeights[i].height;
        translate = this.calculateChildTranslate(cols, height);
      }

      const props = Object.assign(
        {
          onResetWannatagDate: this.props.onResetWannatagDate,
          heightRef: this.pushHeight.bind(this, wannatag.postDate),
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
