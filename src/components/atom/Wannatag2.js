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
    return this.props.isOwner;
  }

  render() {
    const animation = !!this.props.translate;
    const transform = animation
      ? `translate(${this.props.translate.x}px, ${this.props.translate.y}px)`
      : "translate(0px, 10000px)";
    const wannatagStyle = {
      boxShadow: "0 0 1px black",
      width: `${this.props.width}px`,
      wordWrap: "break-word",
      display: "inline-block",
      transform,
      position: "absolute",
      borderRadius: "5px"
    };
    const headerStyle = {
      backgroundColor: "#EFEFEF",
      borderTopLeftRadius: "5px",
      borderTopRightRadius: "5px",
      padding: "10px"
    };
    const bodyStyle = {
      padding: "10px"
    };
    const d = new Date(this.props.postDate);
    const dateStr =
      `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ` +
      `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    let elem = (
      <div>
        <div style={headerStyle}>
          <div>{dateStr}</div>
          <div>{this.props.author}</div>
          <div>{this.props.title}</div>
          {this.isOwner() ? (
            <button onClick={this.onDelete}>delete</button>
          ) : null}
        </div>
        <div style={bodyStyle}>
          <span>{this.props.body}</span>
        </div>
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
        style={wannatagStyle}
        ref={divElement => (this.divElement = divElement)}
        // className={animation ? "wannatag-animation" : ""}
      >
        {elem}
      </div>
    );
  }
}

export default Wannatag;
