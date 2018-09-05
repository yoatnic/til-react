import * as React from "react";
import Wannatag from "../atom/Wannatag";

interface Props {
  wannatags: Array<any>;
  onUpdateFirstWannatagDate: Function;
  onUpdateLastWannatagDate: Function;
  onResetWannatagDate: Function;
}

interface State {
  wannatagHeights: Array<any>;
  cols: number;
  childWidth: number;
}

class Wannatags extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
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

  componentWillReceiveProps(nextProps: Props) {
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
      cols.push({ height: 0, itemCount: 0, realHeight: 0 });
    }
    return cols;
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (
      nextState.wannatagHeights.length > 0 &&
      nextState.wannatagHeights.length < this.state.wannatagHeights.length
    ) {
      return false;
    }
    return true;
  }

  pushHeight(key: number, height: number): any {
    this.setState((prevState: State) => {
      const wannatagHeights = [...prevState.wannatagHeights, { height, key }];
      wannatagHeights.sort(
        (item1: any, item2: any): number => item2.key - item1.key
      );
      return {
        ...prevState,
        wannatagHeights
      };
    });
  }

  minIndex(cols: Array<{ height: number }>) {
    let dst = 0;
    for (let i = 1, minHeihgt = cols[0].height; i < cols.length; i++) {
      if (minHeihgt > cols[i].height) {
        minHeihgt = cols[i].height;
        dst = i;
      }
    }
    return dst;
  }

  calculateChildTranslate(
    cols: Array<{ height: number; itemCount: number; realHeight: number }>,
    height: number
  ) {
    const col = this.minIndex(cols);
    const mergin = 20;
    const translate = {
      x: this.state.childWidth * col + mergin * col + 10,
      y: cols[col].height + mergin * cols[col].itemCount + 10
    };
    cols[col].height += height;
    cols[col].itemCount++;
    // HACK: 50
    cols[col].realHeight = translate.y + height + 80;
    return translate;
  }

  maxHeight(
    cols: Array<{ height: number; itemCount: number; realHeight: number }>
  ) {
    let maxHeihgt = cols[0].realHeight;
    for (let i = 1; i < cols.length; i++) {
      if (maxHeihgt < cols[i].realHeight) {
        maxHeihgt = cols[i].realHeight;
      }
    }
    return maxHeihgt;
  }

  render() {
    const cols = this.createCols();
    let maxHeight = 0;
    const wannatags = this.props.wannatags.map((wannatag, i) => {
      let translate = null;
      if (this.state.wannatagHeights.length === this.props.wannatags.length) {
        const height = this.state.wannatagHeights[i].height;
        translate = this.calculateChildTranslate(cols, height);
        maxHeight = this.maxHeight(cols);
      }

      const props: any = {
        onResetWannatagDate: this.props.onResetWannatagDate,
        heightRef: this.pushHeight.bind(this, wannatag.postDate),
        translate: translate,
        width: this.state.childWidth,
        wannatag
      };
      if (i === 0) {
        props.onUpdateFirstWannatagDate = this.props.onUpdateFirstWannatagDate;
      }
      if (i === this.props.wannatags.length - 1) {
        props.onUpdateLastWannatagDate = this.props.onUpdateLastWannatagDate;
      }
      return <Wannatag key={props.wannatagId} {...props} />;
    });
    const style = {
      width: "100%",
      height: `${maxHeight}px`
    };
    return <div style={style}>{wannatags}</div>;
  }
}

export default Wannatags;
