import React from "react";
import Observer from "react-intersection-observer";
import "../../index.css";

class Wannatag extends React.Component {
  constructor(props) {
    super();
    this.state = {
      onUpdateLastWannatagDate: props.onUpdateLastWannatagDate
    };
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    if (this.props.onUpdateFirstWannatagDate) {
      this.props.onUpdateFirstWannatagDate(this.props.postDate);
    }
    const height = this.divElement.clientHeight;
    this.props.heightRef(height);
  }

  onEnter(inView) {
    if (!inView) return;
    this.props.onUpdateLastWannatagDate(this.props.postDate);
    this.setState({ onUpdateLastWannatagDate: false });
  }

  onDelete() {
    const method = "DELETE";
    fetch(`/wannatags/${this.props.postDate}`, {
      method
    }).then(() => {
      // TODO: Reimplement to no refresh
      this.props.onResetWannatagDate();
    });
  }

  isOwner() {
    // TODO: tempolary
    return this.props.author === "tempuser";
  }

  render() {
    const animation = !!this.props.translate;
    const transform = animation
      ? `translate(${this.props.translate.x}px, ${this.props.translate.y}px)`
      : "translate(0px, 10000px)";
    const style = {
      boxShadow: "0 0 1px black",
      width: `${this.props.width}px`,
      wordWrap: "break-word",
      display: "inline-block",
      transform,
      position: "absolute"
    };
    const d = new Date(this.props.postDate);
    const dateStr =
      `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ` +
      `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    let elem = (
      <div>
        <div>{dateStr}</div>
        <div>{this.props.author}</div>
        <div>{this.props.title}</div>
        <p>{this.props.body}</p>
        {this.isOwner() ? (
          <button onClick={this.onDelete}>delete</button>
        ) : null}
      </div>
    );
    if (this.state.onUpdateLastWannatagDate) {
      elem = (
        <Observer onChange={inView => this.onEnter(inView)} triggerOnce={true}>
          {elem}
        </Observer>
      );
    }
    return (
      <div
        style={style}
        ref={divElement => (this.divElement = divElement)}
        // className={animation ? "wannatag-animation" : ""}
      >
        {elem}
      </div>
    );
  }
}

export default Wannatag;
