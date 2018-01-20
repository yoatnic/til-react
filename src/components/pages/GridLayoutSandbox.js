import React from "react";
import "../../index.css";
class Wannatag extends React.Component {
  componentDidMount() {
    const height = this.divElement.clientHeight;
    this.props.sizeRef(height);
  }

  render() {
    const width = "250px";
    const transform = this.props.translate
      ? `translate(${this.props.translate.x}px, ${this.props.translate.y}px)`
      : "";
    const style = {
      boxShadow: "0 0 1px black",
      width,
      wordWrap: "break-word",
      display: "inline-block",
      transform,
      position: "absolute"
    };
    const d = new Date(this.props.postDate);
    const dateStr =
      `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ` +
      `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

    return (
      <div
        style={style}
        ref={divElement => (this.divElement = divElement)}
        className={transform ? "wannatag-animation" : ""}
      >
        <div>{dateStr}</div>
        <div>{this.props.author}</div>
        <div>{this.props.title}</div>
        <p>{this.props.body}</p>
      </div>
    );
  }
}

class GridLayoutSandbox extends React.Component {
  constructor() {
    super();
    this.state = {
      wannatags: [],
      wannatagSizes: [],
      rails: []
    };
  }

  async componentWillMount() {
    const res = await fetch("/wannatags/0");
    const wannatags = await res.json();
    this.setState({ wannatags, rails: this.getRails() });

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
      nextState.wannatagSizes.length > 0 &&
      nextState.wannatagSizes.length < this.state.wannatagSizes.length
    ) {
      return false;
    }
    return true;
  }

  pushSize(key, size) {
    this.setState(prevState => {
      const wannatagSizes = [...prevState.wannatagSizes, { size, key }];
      wannatagSizes.sort((item1, item2) => item1.key - item2.key);
      return Object.assign({}, prevState, { wannatagSizes });
    });
  }

  minIndex(rails) {
    let dst = 0;
    for (let i = 1, minHeihgt = rails[0].height; i < rails.length; i++) {
      console.log(minHeihgt, rails[i].height);
      if (minHeihgt > rails[i].height) {
        minHeihgt = rails[i].height;
        dst = i;
      }
    }
    return dst;
  }

  calculateChildTranslate(rails, i) {
    const size = this.state.wannatagSizes[i].size;
    const col = this.minIndex(rails, size);
    const mergin = 10;
    const translate = {
      x: 250 * col + mergin * col + 10,
      y: rails[col].height + mergin * rails[col].itemCount + 10
    };
    rails[col].height += size;
    rails[col].itemCount++;
    return translate;
  }

  render() {
    const rails = this.state.rails;
    const wannatags = this.state.wannatags.map((wannatag, i) => {
      let translate = null;
      if (this.state.wannatagSizes.length === this.state.wannatags.length) {
        translate = this.calculateChildTranslate(rails, i);
      }

      return (
        <Wannatag
          key={wannatag.wannatagId}
          {...wannatag}
          sizeRef={this.pushSize.bind(this, i)}
          translate={translate}
        />
      );
    });
    const style = {
      width: "850px"
    };
    return <div style={style}>{wannatags}</div>;
  }
}

export default GridLayoutSandbox;
