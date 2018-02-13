import React from "react";
import ReactDOM from "react-dom";
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
  constructor() {
    super();
    this.state = { height: null };
  }

  componentDidMount() {
    this.setState({
      height: this.divElement.clientHeight
    });
  }

  render() {
    const wannatagStyle = {
      boxShadow: "0 0 1px black",
      width: `250px`,
      wordWrap: "break-word",
      display: "inline-block",
      position: "absolute",
      borderRadius: "3px",
      opacity: 0
    };

    if (this.state.height) {
      const translate = `translate(0px, ${this.state.height *
        this.props.weight}px)`;
      wannatagStyle.transform = translate;
      setTimeout(() => {
        const el = ReactDOM.findDOMNode(this);
        el
          .animate(
            [
              { opacity: 0.1 },
              { opacity: 0.2 },
              { opacity: 0.4 },
              { opacity: 0.8 },
              { opacity: 1 }
            ],
            500
          )
          .finished.then(() => {
            el.style.opacity = 1;
          });
      }, 500);
    }

    const d = new Date(this.props.postDate);
    const dateStr =
      `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ` +
      `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    return (
      <div
        style={wannatagStyle}
        ref={divElement => (this.divElement = divElement)}
      >
        <div style={headerStyle}>
          <div>
            <span>{dateStr}</span>
            <span>{this.props.username}</span>
            <button>delete</button>
          </div>
          <div>{this.props.title}</div>
        </div>
        <div style={bodyStyle}>
          <span>{this.props.body}</span>
        </div>
      </div>
    );
  }
}

export default Wannatag;
