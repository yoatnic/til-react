import React from "react";
import ReactDOM from "react-dom";
import Observer from "react-intersection-observer";
import "../../index.css";

const headerStyle = {
  backgroundColor: "#EFEFEF",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  padding: "10px"
};
const bodyStyle = {
  padding: "10px"
};

class Wannatag extends React.Component {
  constructor(props) {
    super();
    this.state = {
      onUpdateLastWannatagDate: props.onUpdateLastWannatagDate,
      animated: false
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

  async onDelete() {
    const res = await fetch(`/wannatags/${this.props.wannatagId}`, {
      method: "DELETE"
    });
    // TODO wait for complate transaction
    if (res.ok) setTimeout(() => this.props.onResetWannatagDate(), 3000);
  }

  isOwner() {
    // TODO: tempolary
    return this.props.isOwner;
  }

  render() {
    const animation = !!this.props.translate;
    const translate = animation
      ? `translate(${this.props.translate.x}px, ${this.props.translate.y}px)`
      : "translate(0px, 10000px)";
    const wannatagStyle = {
      boxShadow: "0 0 1px black",
      width: `${this.props.width}px`,
      wordWrap: "break-word",
      display: "inline-block",
      transform: translate,
      position: "absolute",
      borderRadius: "2.5px",
      opacity: this.state.animated ? 1 : 0
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

    if (!this.state.animated && animation) {
      setTimeout(() => {
        const el = ReactDOM.findDOMNode(this);
        el
          .animate(
            [
              { transform: `${translate} scale(0.5)`, opacity: 0.6 },
              { transform: `${translate} scale(0.8)`, opacity: 0.8 },
              { transform: `${translate} scale(1.0)`, opacity: 1 }
            ],
            200
          )
          .finished.then(() => {
            this.setState({ animated: true });
          });
      }, 50);
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
