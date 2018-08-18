import React from "react";
import ReactDOM from "react-dom";
import Observer from "react-intersection-observer";
import {
  Elevation,
  Card,
  Button,
  Icon,
  Colors,
  Tooltip,
  Position
} from "@blueprintjs/core";
import { remove } from "../../api/wannatagsAPI"

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
    const result = await remove(this.props.wannatagId)
    // TODO wait for complate transaction
    if (result) setTimeout(() => this.props.onResetWannatagDate(), 3000);
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

class WannatagB extends React.Component {
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
    const self = document.querySelector(`.wanantag${this.props.wannatagId}`);
    const height = self.clientHeight;
    this.props.heightRef(height);
  }

  onEnter(inView) {
    if (!inView) return;
    this.props.onUpdateLastWannatagDate(this.props.postDate);
    this.setState({ onUpdateLastWannatagDate: false });
  }

  async onDelete() {
    const result = await remove(this.props.wannatagId)
    // TODO wait for complate transaction
    if (result) setTimeout(() => this.props.onResetWannatagDate(), 3000);
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
      width: `${this.props.width}px`,
      wordWrap: "break-word",
      transform: translate,
      position: "absolute",
      opacity: this.state.animated ? 1 : 0
    };

    const d = new Date(this.props.postDate);
    const dateStr =
      `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ` +
      `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    let elem = (
      <div>
        <h5 style={{ color: Colors.GRAY2 }}>
          <Tooltip content={this.props.username} position={Position.TOP}>
            <Icon iconSize={24} icon="user" />
          </Tooltip>
          &nbsp;&nbsp;&nbsp;
          {dateStr}
          {this.isOwner() ? (
            <Icon
              icon="cross"
              onClick={this.onDelete}
              style={{ float: "right" }}
            />
          ) : null}
        </h5>
        <h3>{this.props.title}</h3>
        <p>{this.props.body}</p>
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
      <Card
        className={`wanantag${this.props.wannatagId}`}
        interactive={false}
        elevation={Elevation.ONE}
        style={wannatagStyle}
      >
        {elem}
      </Card>
    );
  }
}

export default WannatagB;
